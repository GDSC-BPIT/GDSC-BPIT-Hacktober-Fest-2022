package com.example.scribble_theultimatenotesjunction;

import androidx.lifecycle.ViewModelProvider;
import android.content.Intent;
import android.nfc.Tag;
import android.os.Bundle;

import com.example.scribble_theultimatenotesjunction.Activity.InsertNotesActivity;
import com.example.scribble_theultimatenotesjunction.Activity.InsertNotesActivity;
import com.example.scribble_theultimatenotesjunction.Adapter.NotesAdapter;
import com.example.scribble_theultimatenotesjunction.Model.Notes;
import com.example.scribble_theultimatenotesjunction.ViewModel.NotesViewModel;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.support.v4.app.FragmentActivity;
import android.util.Log;
import android.view.View;

import androidx.lifecycle.Observer;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.recyclerview.widget.StaggeredGridLayoutManager;

import com.example.scribble_theultimatenotesjunction.databinding.ActivityMainBinding;

import android.view.Menu;
import android.view.MenuItem;
import android.widget.SearchView;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    FloatingActionButton newNotesBtn;
    NotesViewModel notesViewModel;
    RecyclerView notesRecycler;
    NotesAdapter adapter;
    List<Notes> filterNotesList;

    TextView nofilter, hightolow, lowtohigh;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    newNotesBtn = findViewById(R.id.newNotesBtn);
    notesRecycler = findViewById(R.id.notesRecycler);

    nofilter = findViewById(R.id.nofilter);
    hightolow = findViewById(R.id.hightolow);
    lowtohigh = findViewById(R.id.lowtohigh);

    nofilter.setBackgroundResource(R.drawable.filter_selected_shape);

    nofilter.setOnClickListener(v -> {
        loadData(0);
        nofilter.setBackgroundResource(R.drawable.filter_selected_shape);
        hightolow.setBackgroundResource(R.drawable.filter_un_shape);
        lowtohigh.setBackgroundResource(R.drawable.filter_un_shape);

    });

    hightolow.setOnClickListener(v -> {
        loadData(1);
        nofilter.setBackgroundResource(R.drawable.filter_un_shape);
        hightolow.setBackgroundResource(R.drawable.filter_selected_shape);
        lowtohigh.setBackgroundResource(R.drawable.filter_un_shape);
    });

    lowtohigh.setOnClickListener(v -> {
        loadData(2);
        nofilter.setBackgroundResource(R.drawable.filter_un_shape);
        hightolow.setBackgroundResource(R.drawable.filter_un_shape);
        lowtohigh.setBackgroundResource(R.drawable.filter_selected_shape);
    });

    notesViewModel = new ViewModelProvider(this).get(NotesViewModel.class);

    newNotesBtn.setOnClickListener(v -> {
        startActivity(new Intent(MainActivity.this, InsertNotesActivity.class));
    });

    notesViewModel.getAllNotes.observe(this, new Observer<List<Notes>>() {
        @Override
        public void onChanged(List<Notes> notes) {
            setAdapter(notes);
            filterNotesList = notes;
        }
    });
    }

    private void loadData(int i)
    {
        if(i==0)
        {
            notesViewModel.getAllNotes.observe(this, new Observer<List<Notes>>() {
                @Override
                public void onChanged(List<Notes> notes) {
                    setAdapter(notes);
                    filterNotesList = notes;
                }
            });
        }
        else if(i==1)
        {
            notesViewModel.hightolow.observe(this, new Observer<List<Notes>>() {
                @Override
                public void onChanged(List<Notes> notes) {
                    setAdapter(notes);
                    filterNotesList = notes;
                }
            });
        }
        else if(i==2)
        {
            notesViewModel.lowtohigh.observe(this, new Observer<List<Notes>>() {
                @Override
                public void onChanged(List<Notes> notes) {
                    setAdapter(notes);
                    filterNotesList = notes;
                }
            });
        }
    }

    public void setAdapter(List<Notes> notes)
    {

            notesRecycler.setLayoutManager(new StaggeredGridLayoutManager(2,StaggeredGridLayoutManager.VERTICAL));
            adapter=new NotesAdapter(MainActivity.this,notes);
            notesRecycler.setAdapter(adapter);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {

        getMenuInflater().inflate(R.menu.search_notes,menu);

        MenuItem menuItem = menu.getItem(R.id.app_bar_search);

        SearchView searchView =(SearchView) menuItem.getActionView();
        searchView.setQueryHint("Search here...");
        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String s) {
                return false;
            }

            @Override
            public boolean onQueryTextChange(String s) {

                NotesFilter(s);

                return false;
            }
        });

        return super.onCreateOptionsMenu(menu);
    }

    private void NotesFilter(String s) {
        ArrayList<Notes> FilterNames = new ArrayList<>();

        for(Notes notes:this.filterNotesList)
        {
            if(notes.notesTitle.contains(s) || notes.notesSubtitle.contains(s))
            {
                FilterNames.add(notes);
            }
        }
        this.adapter.searchNotes(FilterNames);
    }
}