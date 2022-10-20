import 'package:flutter/material.dart';
import 'dart:math';

void main() {
  runApp(
    MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        backgroundColor: Colors.amber,
        appBar: AppBar(
            title: Center(
              child: Text(
                'Dice Roll',
                style: TextStyle(fontSize: 35.00, fontFamily: 'SourceSans'),
              ),
            ),
            backgroundColor: Colors.orange),
        body: DicePage(),
      ),
    ),
  );
}

class DicePage extends StatefulWidget {
  const DicePage({Key? key}) : super(key: key);

  @override
  State<DicePage> createState() => _DicePageState();
}

class _DicePageState extends State<DicePage> {
  @override
  void updatedice() {
    setState(() {
      rightdicenumber = Random().nextInt(6) + 1;
      leftdicenumber = Random().nextInt(6) + 1;
    });
  }

  int leftdicenumber = 2;
  int rightdicenumber = 2;

  Widget build(BuildContext context) {
    return Center(
      child: Column(
        children: [
          Row(
            children: [
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: TextButton(
                      onPressed: () {
                        updatedice();
                      },
                      child: Image.asset('images/dice$leftdicenumber.png')),
                ),
              ),
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: TextButton(
                      onPressed: () {
                        updatedice();
                      },
                      child: Image.asset('images/dice$rightdicenumber.png')),
                ),
              ),
            ],
          ),
          Expanded(
            // flex: 10,
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: SizedBox(
                width: 75.0,
                height: 10.0,
                child: TextButton(
                  onPressed: () {
                    updatedice();
                  },
                  style: TextButton.styleFrom(backgroundColor: Colors.orange),
                  child: Text('ROLL',style: TextStyle(fontSize: 90.00, fontFamily: 'SourceSans',color: Colors.white),),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
