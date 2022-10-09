package com.geekym.rawtemplate.Authentication

import android.annotation.SuppressLint
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.method.HideReturnsTransformationMethod
import android.text.method.PasswordTransformationMethod
import android.util.Patterns
import android.view.MotionEvent
import android.widget.Toast
import com.geekym.rawtemplate.MainActivity
import com.geekym.rawtemplate.R
import com.geekym.rawtemplate.databinding.ActivitySignInBinding
import com.google.firebase.auth.FirebaseAuth

class SignInActivity : AppCompatActivity() {

    private lateinit var binding: ActivitySignInBinding
    private lateinit var firebaseAuth: FirebaseAuth

    @SuppressLint("ClickableViewAccessibility")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySignInBinding.inflate(layoutInflater)
        setContentView(binding.root)

        supportActionBar?.hide()

        firebaseAuth = FirebaseAuth.getInstance()

        var passwordVisible = false

        binding.loginpassword.setOnTouchListener { v, event ->
            val Right = 2
            if (event.getAction() === MotionEvent.ACTION_UP) {
                if (event.getRawX() >= binding.loginpassword.getRight() - binding.loginpassword.getCompoundDrawables()
                        .get(Right).getBounds().width()
                ) {
                    val selection: Int = binding.loginpassword.getSelectionEnd()
                    //Handles Multiple option popups
                    if (passwordVisible) {
                        //set drawable image here
                        binding.loginpassword.setCompoundDrawablesRelativeWithIntrinsicBounds(
                            0,
                            0,
                            R.drawable.visibility_off,
                            0
                        )
                        //for hide password
                        binding.loginpassword.setTransformationMethod(PasswordTransformationMethod.getInstance())
                        passwordVisible = false
                    } else {
                        //set drawable image here
                        binding.loginpassword.setCompoundDrawablesRelativeWithIntrinsicBounds(
                            0,
                            0,
                            R.drawable.visibility,
                            0
                        )
                        //for show password
                        binding.loginpassword.setTransformationMethod(HideReturnsTransformationMethod.getInstance())
                        passwordVisible = true
                    }
                    binding.loginpassword.setLongClickable(false) //Handles Multiple option popups
                    binding.loginpassword.setSelection(selection)
                    return@setOnTouchListener true
                }
            }
            false
        }

        binding.frgtpass.setOnClickListener {
            startActivity(Intent(this, ForgotPassword::class.java))
        }

        binding.signuptext.setOnClickListener {
            startActivity(Intent(this, SignUpActivity::class.java))
        }

        binding.signin.setOnClickListener {
            val email = binding.loginemail.text.toString()
            val password = binding.loginpassword.text.toString()

            if (email.isNotEmpty() && password.isNotEmpty() && Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
                if (password.length > 8) {
                    firebaseAuth.signInWithEmailAndPassword(email, password).addOnCompleteListener {
                        if (it.isSuccessful) {
                            val u = firebaseAuth.currentUser
                            if (u?.isEmailVerified!!) {
                                startActivity(Intent(this, MainActivity::class.java))
                            } else {
                                u.sendEmailVerification()
                                Toast.makeText(this, "Email Verification sent to your mail",Toast.LENGTH_LONG).show()
                            }
                        } else
                            Toast.makeText(this, it.exception.toString(), Toast.LENGTH_SHORT).show()
                    }
                } else {
                    Toast.makeText(this, "Password length must be greater than 8", Toast.LENGTH_SHORT).show()
                }
            } else {
                Toast.makeText(this, "Please enter the details!", Toast.LENGTH_SHORT).show()
            }
        }
    }
}