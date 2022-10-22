package com.geekym.rawtemplate.Introduction

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import com.geekym.rawtemplate.MainActivity
import com.geekym.rawtemplate.R
import com.google.firebase.auth.FirebaseAuth

class Splashscreen : AppCompatActivity() {

    lateinit var handler: Handler
    private lateinit var firebaseAuth: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splashscreen)

        supportActionBar?.hide()
        firebaseAuth = FirebaseAuth.getInstance()

        handler = Handler()
        handler.postDelayed({

            // Delay and Start Activity
            val intent = Intent(this, Onboarding::class.java)
            startActivity(intent)
            finish()
        } , 2500) // here we're delaying to startActivity after 2 seconds

    }
}