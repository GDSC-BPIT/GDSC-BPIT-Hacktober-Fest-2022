from classes import *

if __name__ == "__main__":

    url = 'http://www.iitdh.ac.in/'
    visited = set()
    queue = [url]

    elastic_search = ElasticSearch(
        "http://localhost:9200", 'elastic', 'elastic')
    elastic_search.createClient()

    if not elastic_search.checkIndex("searchengine"):
        elastic_search.createIndex("searchengine")

    # connecting to sql server
    sql = SQL("127.0.0.1", "root", "", "3306")
    sql.connect_SQL_Server()

    # connecting database
    if not sql.check_database('searchengine'):
        sql.create_database('searchengine')
    sql.connect_database('searchengine')

    # checking table
    if not sql.check_table('hashcodes_table'):
        sql.create_table(
            'hashcodes_table', "(url VARCHAR(500)  BINARY, hashcode VARCHAR(50), time_stamp VARCHAR(40), primary key (url))")

    # hashing class
    hash = hashing()

    while len(queue) != 0:
        print('*********************', len(queue), '********************')
        current_url = queue.pop(0)
        visited.add(current_url)
        print(current_url)

        extractor = TextExtraction(current_url)
        if '.pdf' in current_url:
            pdf = PDF()
            try:
                pdf.download_file(current_url)
                # Extracting text from the pdf_file
                pdf.pdf_reading()
                # Extracting text from the images in the pdf_file
                soup = pdf.img_reading()
                raw_text = soup
            except:
                print('cant be extracted')
                continue
        else:
            soup = extractor.html_content()  # Getting the complete html content
            raw_text = extractor.GetText()  # Getting the raw text without html tags

            if raw_text == '':
                continue

        id = hash.hash(current_url)

        # checking hashcodes
        curr_hashcode = hash.hash(soup)

        query = "SELECT url, hashcode FROM hashcodes_table WHERE BINARY url = %s"
        values = (current_url,)

        sql.executeQuery(query, values)
        data = sql.my_cursor.fetchone()
        prev_hashcode = None

        if data:
            prev_hashcode = data[1]
            print(prev_hashcode, curr_hashcode)

        if not prev_hashcode:
            # Tokenizing and filtering the words
            # filtered_words = extractor.Filter(raw_text)
            search_engine_instance = search_engine(
                current_url, raw_text, id)
            elastic_search.insertIntoIndex(search_engine_instance)

            sql.insert('hashcodes_table', (current_url,
                       curr_hashcode, str(datetime.now())))

        else:
            if prev_hashcode != curr_hashcode:
                # Tokenizing and filtering the words
                # filtered_words = extractor.Filter(raw_text)

                search_engine_instance = search_engine(
                    current_url, raw_text, id)
                elastic_search.updateIndex(search_engine_instance)

                sql.update('hashcodes_table', {'url': current_url}, {
                           'hashcode': curr_hashcode, 'time_stamp': str(datetime.now())})

        try:
            # getting urls in respective link
            for a_tag in soup.findAll("a"):
                href = a_tag.attrs.get("href")
                if href == "" or href is None:
                    continue
                new_url = urljoin(current_url, href)
                new_url = new_url.strip('\n')
                if not valid_url(new_url):
                    continue
                elif new_url in visited:
                    continue
                elif new_url not in queue:
                    queue.append(new_url)
        except:
            print("couldn't be crawled")
