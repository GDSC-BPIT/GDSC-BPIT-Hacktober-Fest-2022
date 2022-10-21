package com.example.scribble_theultimatenotesjunction.Dao;

import androidx.lifecycle.LiveData;
import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import com.example.scribble_theultimatenotesjunction.Model.Notes;

import java.util.List;

@Dao
public interface NotesDao {

    @Query("SELECT * FROM Notes_Database")
    LiveData<List<Notes>> getallNotes();

    @Query("SELECT * FROM Notes_Database ORDER BY notes_priority DESC")
    LiveData<List<Notes>> hightolow();

    @Query("SELECT * FROM Notes_Database ORDER BY notes_priority ASC")
    LiveData<List<Notes>> lowtohigh();

    @Insert
    void insertNotes(Notes... notes);

    @Query("DELETE FROM Notes_Database WHERE id=:id")
    void deleteNotes(int id);

    @Update
    void updateNotes(Notes notes);
}
