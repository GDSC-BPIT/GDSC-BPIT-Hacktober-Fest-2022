package com.geekym.rawtemplate.Homefragments

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.geekym.rawtemplate.databinding.FragmentThirdBinding

class ThirdFragment : Fragment() {

    private var _binding: FragmentThirdBinding? = null
    private val binding get() = _binding!!

     override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

         //Your code here

         _binding = FragmentThirdBinding.inflate(inflater, container, false)
         return binding.root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}