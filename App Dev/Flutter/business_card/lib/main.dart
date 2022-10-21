import 'dart:ui';

import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: Colors.teal,
        body: SafeArea(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const CircleAvatar(
                radius: 90.00,
                // backgroundColor: Colors.red,
                backgroundImage: AssetImage('images/imagedummy.jpg'),
              ),
              const Text(
                'Your Name',
                style: TextStyle(
                    fontSize: 40.00,
                    fontFamily: 'Pacifico',
                    fontWeight: FontWeight.bold,
                    letterSpacing: 2.00,
                    color: Colors.white),
              ),
              Text(
                'Your Designation',
                style: TextStyle(
                    fontSize: 20.00,
                    fontFamily: 'SourceSans',
                    color: Colors.teal.shade100,
                    letterSpacing: 4.80),
              ),
              SizedBox(
                height: 25.00,
                width: 150.00,
                child: Divider(
                  color: Colors.teal.shade100,
                ),
              ),
              Card(
                margin:
                    EdgeInsets.symmetric(vertical: 15.00, horizontal: 25.00),
                // padding: EdgeInsets.all(12.00),
                child: ListTile(
                  leading: Icon(
                    Icons.phone,
                    color: Colors.teal,
                    size: 35.00,
                  ),
                  title: Text(
                    '+1 202-918-2132',
                    style: TextStyle(
                        fontFamily: 'SourceSans',
                        fontSize: 19.70,
                        color: Colors.teal.shade900,
                        fontWeight: FontWeight.bold),
                  ),
                ),
              ),
              Card(
                margin:
                    EdgeInsets.symmetric(vertical: 15.00, horizontal: 25.00),
                // padding: EdgeInsets.all(12.00),
                color: Colors.white,
                child: ListTile(
                  leading: Icon(
                    Icons.email,
                    color: Colors.teal,
                    size: 35.00,
                  ),
                  title: Text(
                    'yourEmail@gmail.com',
                    style: TextStyle(
                        fontFamily: 'SourceSans',
                        fontSize: 18.70,
                        color: Colors.teal.shade900,
                        fontWeight: FontWeight.bold),
                  ),
                ),
              ),
              Card(
                margin:
                    EdgeInsets.symmetric(vertical: 15.00, horizontal: 25.00),
                // padding: EdgeInsets.all(12.00),
                color: Colors.white,
                child: ListTile(
                  leading: Icon(
                    Icons.account_box_rounded,
                    color: Colors.teal,
                    size: 35.00,
                  ),
                  title: Text(
                    '@yourAccount',
                    style: TextStyle(
                        fontFamily: 'SourceSans',
                        fontSize: 18.70,
                        color: Colors.teal.shade900,
                        fontWeight: FontWeight.bold),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
