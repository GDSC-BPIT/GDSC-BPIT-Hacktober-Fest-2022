#include <bits/stdc++.h>
using namespace std;
#define INF 99999

int graph[V][V] = {{0, 4, 1, 4, INF, INF},
                   {4, 0, 3, 8, 3, INF},
                   {1, 3, 0, INF, 1, INF},
                   {4, 8, INF, 0, 5, 7},
                   {INF, 3, 1, 5, 0, INF},
                   {INF, INF, INF, 7, INF, 0}};

void findMinimumEdge() {
    for (int i = 0; i < 6; i++) {
        int min = INF;
        int minIndex = 0;
        for (int j = 0; j < 6; j++) {
            if (graph[i][j] != 0 && graph[i][j] < min) {
                min = graph[i][j];
                minIndex = j;
            }
        }
        cout << i << "  -  " << minIndex << "\t" << graph[i][minIndex] << "\n";
    }
}

int main() {
    findMinimumEdge();
    return 0;
}
