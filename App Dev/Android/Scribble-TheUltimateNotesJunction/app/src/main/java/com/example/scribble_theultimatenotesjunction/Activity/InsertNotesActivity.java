package com.example.scribble_theultimatenotesjunction.Activity;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;
import android.os.Bundle;
import android.text.format.DateFormat;
import android.view.View;
import android.widget.Toast;

import com.example.scribble_theultimatenotesjunction.Dao.NotesDao;
import com.example.scribble_theultimatenotesjunction.Model.Notes;
import com.example.scribble_theultimatenotesjunction.R;
import com.example.scribble_theultimatenotesjunction.ViewModel.NotesViewModel;
import com.example.scribble_theultimatenotesjunction.databinding.ActivityInsertNotesBinding;
import com.example.scribble_theultimatenotesjunction.databinding.ActivityInsertNotesBinding;

import java.util.Date;

public class InsertNotesActivity extends AppCompatActivity {

    ActivityInsertNotesBinding binding;
    String title,subtitle,notes;
    NotesViewModel notesViewModel;
    String priority="1";
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityInsertNotesBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        notesViewModel = new ViewModelProvider(this).get(NotesViewModel.class);

        binding.greenPriority.setOnClickListener(v -> {
            binding.greenPriority.setImageResource(R.drawable.done);
            binding.yellowPriority.setImageResource(0);
            binding.redPriority.setImageResource(0);
            priority="1";
        });
        binding.yellowPriority.setOnClickListener(v -> {
            binding.greenPriority.setImageResource(0);
            binding.yellowPriority.setImageResource(R.drawable.done);
            binding.redPriority.setImageResource(0);
            priority="2";
        });

        binding.redPriority.setOnClickListener(v -> {
            binding.greenPriority.setImageResource(0);
            binding.yellowPriority.setImageResource(0);
            binding.redPriority.setImageResource(R.drawable.done);
            priority="3";
        });


        binding.doneNotesBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                title = binding.notesTitle.getText().toString();
                subtitle = binding.notesSubtitle.getText().toString();
                notes = binding.notesData.getText().toString();

                CreateNotes(title, subtitle, notes);
            }
        });
    }

    public void CreateNotes(String title, String subtitle, String notes) {

        Date date=new Date();
        CharSequence sequence= DateFormat.format("MMMM d, yyyy",date.getTime());

        Notes notes1=new Notes();
        notes1.notesTitle=title;
        notes1.notesSubtitle=subtitle;
        notes1.notes=notes;
        notes1.notesDate= sequence.toString();
        notes1.notesPriority=priority;
        notesViewModel.insertNote(notes1);

        Toast.makeText(this, "Notes Created Successfully", Toast.LENGTH_SHORT).show();
        
        finish();
        
    }
}