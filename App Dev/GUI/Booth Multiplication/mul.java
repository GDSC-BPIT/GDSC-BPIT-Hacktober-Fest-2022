/**
 * Write a description of mul here.
 * 
 * @author Sushant Sinha
 * @version v1.0.0
 */

import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.geometry.Pos;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.text.Text;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.layout.GridPane;
import javafx.stage.Stage;
import javafx.scene.paint.Color;
import javax.swing.*;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;


public class mul extends Application {

    public boolean binarymode=false;

    public static void main(String[] args) {
        launch(args);
    }
    
    @Override
    public void start(Stage primaryStage) throws Exception {

        GridPane root = new GridPane();
        GridPane output = new GridPane();
        Button btn = new Button("Multiply");
        Button btn1 = new Button("Binary\nMode");

        btn.setStyle(
            "-fx-background-radius: 5em; " +
            "-fx-min-width: 90px; " +
            "-fx-min-height: 90px; " +
            "-fx-max-width: 90px; " +
            "-fx-max-height: 90px;"
            );
        btn1.setStyle(
            "-fx-background-radius: 5em; " +
            "-fx-min-width: 90px; " +
            "-fx-min-height: 90px; " +
            "-fx-max-width: 90px; " +
            "-fx-max-height: 90px;"
            );

        Button exit = new Button("Exit");

        exit.setTextFill(Color.WHITE);

        exit.setStyle(
            "-fx-background-color: #af0000;"+
            "-fx-background-radius: 5em; " +
            "-fx-min-width: 90px; " +
            "-fx-min-height: 90px; " +
            "-fx-max-width: 90px; " +
            "-fx-max-height: 90px;"
            );

        Text t1 = new Text("Multiplicand: ");
        Text t2 = new Text("Multiplier: ");
        TextField multiplicand = new TextField();
        TextField multiplier = new TextField();
        TextArea result=new TextArea();
        result.setPrefWidth(1000);        
        result.setPrefHeight(500);
        result.setEditable(false);
        
        Scene scene = new Scene(root, 1500, 800);
        Scene scene1 = new Scene(output, 1500, 800);
        
        root.setHgap(17);
        root.setVgap(20);
        root.add(btn, 25, 20);
        root.add(btn1, 25, 17);
        root.add(t1, 15, 17);
        root.add(t2, 35, 17);
        root.add(multiplicand, 17, 17);
        root.add(multiplier, 37, 17);

        output.setHgap(15);
        output.setVgap(50);
        output.add(result,20,4);
        output.add(exit,22,4);
        
        primaryStage.setScene(scene);
        primaryStage.setTitle("BOOTH MULTIPLIER");
        primaryStage.show();
        
        btn1.setOnAction(new EventHandler < ActionEvent > () {

            @Override
            public void handle(ActionEvent arg0) {

                binarymode=true;

            }

        });
        
        // action events
        btn.setOnAction(new EventHandler < ActionEvent > () {



            @Override
            public void handle(ActionEvent arg0) {

                // all the println statements are just for debugging and users reference

                System.out.println(binarymode);

                int m1,m2;
                
                if(binarymode){

                    String mcand=multiplicand.getText();
                    String mpier=multiplier.getText();

                    m1=0;
                    m2=0;
                    
                    boolean mcandisneg=false,mpierisneg=false;
                    
                    // if negative.... then we need to take 2s complement... and then find its decimal value... and then add a negative sign
                    
                    if(mcand.charAt(0)=='1'){
                        mcand=get2scomplement(mcand);
                        mcandisneg=true;
                    }
                    
                    if(mpier.charAt(0)=='1'){
                        mpier=get2scomplement(mpier);
                        mpierisneg=true;
                    }

                    char ar1[]=mcand.toCharArray();
                    char ar2[]=mpier.toCharArray();

                    for(int i=1; i<ar1.length;i++){
                        if(ar1[i]=='1')
                            m1+=Math.pow(2,(ar1.length-1-i));
                        //System.out.println("m1="+m1);
                    }
                    
                    
                    if(mcandisneg)
                        m1*=-1;
                    

                    //multiplier
                    
                    for(int i=1; i<ar2.length;i++){
                        if(ar2[i]=='1')
                            m2+=Math.pow(2,(ar2.length-1-i));
                        System.out.println("m2="+m2);
                    }

                    if(mpierisneg)
                        m2*=-1;

                }

                // if not binarymode.. then the input is in decimal format and ready to be used without any preprocessing
                
                else{

                    m1 = Integer.parseInt(multiplicand.getText());
                    m2 = Integer.parseInt(multiplier.getText());
                    
                }
                
                System.out.println("m1="+m1+" m2="+m2);
                
                // convert the multiplicand to binary
                String m = getbinary(m1);
                result.setText(result.getText()+m1 +", the multiplicand in signed 2s complement notation is " +m+"\n");

                // convert the multiplier to binary
                String r = getbinary(m2);
                result.setText(result.getText()+m2 +", the multiplier in signed 2s complement notation is " +r);
                
                // no. of bits in multiplicand
                int x = m.length();
                
                // no. of bits in mulitplier
                int y = r.length();

                result.setText("\n"+result.getText()+"\n-------------------------------------------------------------------------");
                // determining initial values of A(BR) ,S(BR'+1) and P(product)

                // A contains m0000 (the number of zeroes are same as the length of multiplier+1... +1 is because we have got Qn+1)
                // this means the length will be : [length of multiplicand](AC) + [length of multiplier](QR) + [1](Qn+1)
                String A = m;
                for (int i = 0; i <= y; i++) {
                    A = A + "0";
                }
                
                System.out.println("A="+A);

                // here the zeroes were (above) for making the addition seamless with AC+QR+Qn+1... the QR+Qn+1 bits are anyhow being carried down when we are doing it handwritten
                // A is BR
                result.setText(result.getText()+"\n\nThe initial value of BR (with appended zeroes for ease of addition) is " + A);
                
                // for debugging... "m" contains 2's complement of Multiplicand
                System.out.println("m="+m);
                
                // S is 2s complement of BR
                String S = get2scomplement(m.substring(1));
                System.out.println("S="+S);
                
                // adding sign which we removed in line no. 219
                if (m1 <= 0) {
                    S = "0" + S;
                }
                
                else{
                    S = "1" + S;
                }

                // appending zeroes again as was done previously with A (BR register)
                for (int i = 0; i <= y; i++) {
                    S = S + "0";
                }

                // S is 2s complement of BR
                result.setText(result.getText()+"\n\nThe initial value of 2's complement of BR represented by BR'+1(with appended zeroes for ease of addition) is " + S);

                // String P is the combined register... presents (0)(no. of zeroes equals length of AC)+(QR is copied)+("0" initialized Qn+1) ---> see line no. 246
                String P = "";
                for (int i = 0; i < x; i++) {
                    P += "0";
                }
                
                // initializing multiplier + Qn+1 to be zero
                P = P + r + "0";
                result.setText(result.getText()+"\n\nThe initial value of AC+QR+Q(n+1) is " + P);
                result.setText(result.getText()+"\n-------------------------------------------------------------------------");

                // for the number of bits in multiplier... it is SC
                for (int i = y; i >0; i--) {

                    // condition for QnQn+1=01
                    if (P.substring(P.length() - 2).equals("01")) {

                        // add P to BR
                        P = binaryaddn(P, A);
                        P = arithmeticshiftright(P);
                        result.setText(result.getText()+"\nThe value of    AC+QR+Q(n+1)    after          AC+QR+Q(n+1) + BR operation and right shift is                  " + P + "          for SC = " + i);
                    }

                    // condition for QnQn+1=10                    
                    else if (P.substring(P.length() - 2).equals("10")) {

                        // add P to 2s complement of BR
                        P = binaryaddn(P, S);
                        P = arithmeticshiftright(P);
                        result.setText(result.getText()+"\nThe value of    AC+QR+Q(n+1)    after          AC+QR+Q(n+1) + BR'+1 operation and right shift is            " + P + "          for SC = " + i);
                    }

                    // condition for QnQn+1=00 or QnQn+1=11                    
                    else {
                        P = arithmeticshiftright(P);
                        result.setText(result.getText()+"\nThe value of    AC+QR+Q(n+1)    after          right shift is                                                                             " + P +"          for SC = " + i);
                    }
                }

                result.setText(result.getText()+"\n\nSC is ZERO now. So we will END the process.");

                // remove the last character which was Qn+1
                P = P.substring(0, P.length() - 1);
                result.setText(result.getText()+"\n-------------------------------------------------------------------------");

                result.setText(result.getText()+"\nThe product of the numbers entered in binary is " +P);
                if (P.charAt(0) == '0') {
                    
                    // referred
                    result.setText(result.getText()+"\nIt's Decimal Equivalent is ");
                    
                    Long n = Long.parseLong(P);
                    Long rem = (long) 0;
                    Long ans = (long) 0;
                    Long val = (long) 1;

                    // since the base is 10...
                    while (n != 0) {
                        rem = n % 10;
                        ans = ans + rem * val;
                        n = n / 10;
                        val = val * 2;
                    }
                    
                    result.setText(result.getText()+ans);
                    
                }

                if (P.charAt(0) == '1'){
                    
                    result.setText(result.getText()+"\nMSB = 1 indicates that the given number is negative." +" It's magnitude is given by the magnitude of it's 2's complement, that is ");
                    String comp=get2scomplement(P);
                    
                    // referred
                    Long n = Long.parseLong(comp);
                    Long rem = (long) 0;
                    Long ans = (long) 0;
                    Long val = (long) 1;

                    while (n != 0) {
                        rem = n % 10;
                        ans = ans + rem * val;
                        n = n / 10;
                        val = val * 2;
                    }
                    
                    result.setText(result.getText()+ans);


                }
                
                primaryStage.setScene(scene1);
                primaryStage.setTitle("BOOTH MULTIPLIER");
                primaryStage.show();

            }

        });

exit.setOnAction(new EventHandler < ActionEvent > (){

    @Override
    public void handle(ActionEvent arg0) {

        System.exit(0);

    }

});
}

static String get2scomplement(String s1) {

    String s2 = "";
    
        for (int i = 0; i < s1.length(); i++) {
            
            // flipping the bits
            if (s1.charAt(i) == '0') {
                s2 += '1';
                continue;
            }
            s2 += '0';
        }

        // referred section... its doing 1s complement+1
        String s3 = "";
        String carry = "1";
        for (int i = s2.length() - 1; i >= 0; i--) {

            if (s2.charAt(s2.length() - 1) == '0') {
                s2 = s2.substring(0, s2.length() - 1) + "1";
                return s2;
            }

            if (s2.charAt(i) == '1' && carry.equals("1")) {
                s3 = '0' + s3;
                carry = "1";
            } else if (s2.charAt(i) == '0' && carry.equals("1")) {
                s3 = '1' + s3;
                carry = "0";
            } else if (s2.charAt(i) == '0' && carry.equals("0")) {
                s3 = '0' + s3;
                carry = "0";
            } else {
                s3 = '1' + s3;
                carry = "0";
            }

        }

        return s3;

    }

    public static String getbinary(int n) {

        String str1 = "";

        if(n>=0){

            // referred function .toBinaryString()
            str1 = Integer.toBinaryString(n);
            // get binary and adding 0 for showing its sign
            str1 = "0" + str1;

        }

        else{

            // get binary for the positive number
            str1 = Integer.toBinaryString(-1 * n);
            // get 2s complement of the binary
            str1 = get2scomplement(str1);
            // add 1 for showing that its negative
            str1 = "1" + str1;

        }

        return str1;

    }

    public static String arithmeticshiftright(String str) {

        return str.charAt(0) + str.substring(0, str.length() - 1);

    }

    public static String binaryaddn(String s1, String s2) {

        String ans = "";
        String carry = "0";

        for (int i=s1.length()-1;i>= 0;i--){

            if(s1.charAt(i) == '1' && s2.charAt(i) == '1' && carry.equals("0") || (s1.charAt(i) == '0' && s2.charAt(i) == '1' && carry.equals("1")) || s1.charAt(i) == '1' && s2.charAt(i) == '0' && carry.equals("1")) {
                ans = '0' + ans;
                carry = "1";
            }

            else if (s1.charAt(i) == '1' && s2.charAt(i) == '1' && carry.equals("1")) {
                ans = '1' + ans;
                carry = "1";
            }

            else if (s1.charAt(i) == '0' && s2.charAt(i) == '1' && carry.equals("0") || s1.charAt(i) == '1' && s2.charAt(i) == '0' && carry.equals("0") || s1.charAt(i) == '0' && s2.charAt(i) == '0' && carry.equals("1")) {
                ans = '1' + ans;
                carry = "0";
            }

            else if (s1.charAt(i) == '0' && s2.charAt(i) == '0' && carry.equals("0")) {
                ans = '0' + ans;
                carry = "0";
            }

        }

        return ans;

    }

}
