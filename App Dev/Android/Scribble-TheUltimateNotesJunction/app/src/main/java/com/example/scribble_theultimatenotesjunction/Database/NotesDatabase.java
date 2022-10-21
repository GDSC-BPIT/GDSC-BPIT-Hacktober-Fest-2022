package com.example.scribble_theultimatenotesjunction.Database;


import android.content.Context;

import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;

import com.example.scribble_theultimatenotesjunction.Model.Notes;
import com.example.scribble_theultimatenotesjunction.Dao.NotesDao;

@Database(entities = {Notes.class}, version = 1)
public abstract class NotesDatabase extends RoomDatabase {

    public abstract NotesDao notesDao();

    public static NotesDatabase INSTANCE;

    public static NotesDatabase getDatabaseInstance(Context context, String name)
    {
        if(INSTANCE == null){
            INSTANCE = Room.databaseBuilder(context.getApplicationContext(),
                    NotesDatabase.class,
                    "Notes_Database")
                    .allowMainThreadQueries()
                    .build();
        }
        return INSTANCE;
    }
    public static NotesDatabase getDatabaseInstance(Context context)
    {
        if(INSTANCE == null){
            INSTANCE = Room.databaseBuilder(context.getApplicationContext(),
                    NotesDatabase.class,
                    "Notes_Database")
                    .allowMainThreadQueries()
                    .build();
        }
        return INSTANCE;
    }
}
