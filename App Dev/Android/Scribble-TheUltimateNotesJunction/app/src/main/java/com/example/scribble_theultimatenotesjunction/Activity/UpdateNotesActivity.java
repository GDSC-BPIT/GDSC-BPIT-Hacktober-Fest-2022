package com.example.scribble_theultimatenotesjunction.Activity;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.text.format.DateFormat;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.example.scribble_theultimatenotesjunction.Model.Notes;
import com.example.scribble_theultimatenotesjunction.R;
import com.example.scribble_theultimatenotesjunction.ViewModel.NotesViewModel;
import com.example.scribble_theultimatenotesjunction.databinding.ActivityUpdateNotesBinding;
import com.google.android.material.bottomsheet.BottomSheetDialog;

import java.util.Date;

public class UpdateNotesActivity extends AppCompatActivity {

    ActivityUpdateNotesBinding binding;
    String priority="1";
    int iid;
    String stitle,ssubtitle,snotes,spriority;
    NotesViewModel notesViewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_update_notes);
        binding = ActivityUpdateNotesBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        iid = getIntent().getIntExtra("id",0);
        stitle = getIntent().getStringExtra("title");
        ssubtitle = getIntent().getStringExtra("subtitle");
        spriority = getIntent().getStringExtra("priority");
        snotes = getIntent().getStringExtra("notes");


        binding.upTitle.setText(stitle);
        binding.upSubtitle.setText(ssubtitle);
        binding.upNotes.setText(snotes);

        if(spriority.equals("1")){
            binding.greenPriority.setImageResource(R.drawable.done);
        }
        if(spriority.equals("2")){
            binding.yellowPriority.setImageResource(R.drawable.done);
        }
        if(spriority.equals("3")){
            binding.redPriority.setImageResource(R.drawable.done);
        }

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

        binding.updateNotesBtn.setOnClickListener(v -> {
            String title = binding.upTitle.getText().toString();
            String subtitle = binding.upSubtitle.getText().toString();
            String notes = binding.upNotes.getText().toString();

            UpdateNotes(title, subtitle, notes);
        });
    }

    private void UpdateNotes(String title, String subtitle, String notes) {

        Date date=new Date();
        CharSequence sequence= DateFormat.format("MMMM d, yyyy",date.getTime());

        Notes notes2=new Notes();
        notes2.id=iid;
        notes2.notesTitle=title;
        notes2.notesSubtitle=subtitle;
        notes2.notes=notes;
        notes2.notesDate= sequence.toString();
        notes2.notesPriority=priority;

        notesViewModel.updateNote(notes2);

        Toast.makeText(this, "Notes Updated Successfully", Toast.LENGTH_SHORT).show();

        finish();
    }
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.delete_menu,menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        if(item.getItemId()==R.id.ic_delete)
        {
            BottomSheetDialog sheetDialog=new BottomSheetDialog(UpdateNotesActivity.this,R.style.BottomSheetStyle);

            View view = LayoutInflater.from(UpdateNotesActivity.this).inflate(R.layout.delete_bottom_sheet,
                    (LinearLayout)findViewById(R.id.bottomSheet));
            sheetDialog.setContentView(view);

            TextView yes,no;
            yes=view.findViewById(R.id.delete_yes);
            no=view.findViewById(R.id.delete_no);

            yes.setOnClickListener(v -> {

                notesViewModel.deleteNote(iid);
                finish();

            });
            no.setOnClickListener(v -> {
                sheetDialog.dismiss();
            });

            sheetDialog.show();
        }
        return true;
    }
}
