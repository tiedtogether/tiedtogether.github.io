package com.csi.helloworld.Student;

import java.util.Arrays;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.csi.helloworld.Tutor.Tutor;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "students")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Student {

    @Id
    private ObjectId id;
    private String band;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String instrument;
    private String kisdID;
    private String password;
    private String settingPreference;
    private String communicationPreference;
    private String email;
    private boolean currentlyInLessons;
    private int grade;
    private String currentTutor;

    public static final String[] woodwinds = { //Broader subcategory
        "Flute",
        "Clarinet",
        "Bass Clarinet",
        "Alto Saxophone",
        "Tenor Saxophone",
        "Bassoon",
        "Oboe"
    };

    public static final String[] brass = { //Broader subcategory
        "Trumpet",
        "Trombone",
        "French Horn",
        "Baritone/Euphonium",
        "Tuba"
    };

    public static final String[] saxophones = { //Smaller subcategory
        "Alto Saxophone",
        "Tenor Saxophone"
    };

    public static final String[] clarinets = { //Smaller subcategory
        "Clarinet",
        "Bass Clarinet"
    };

    public Student scheduleLesson(String KisdID) {
        this.setCurrentTutor(KisdID);
        return this;
    }

    public Student unscheduleLesson(String KisdID) {
        this.setCurrentTutor(null);
        return this;
    }

    public boolean playsSameOrSimilarInstrument(Tutor tutor) {
        
        if (this.instrument.equals(tutor.getInstrument())) {
            return true;
        } 
        
        else if (Arrays.asList(Student.woodwinds).contains(tutor.getInstrument())) {
            if (Arrays.asList(Student.woodwinds).contains(this.instrument)) {
                return true;
            } 
        }

        else if (Arrays.asList(Student.brass).contains(tutor.getInstrument())) {
            if (Arrays.asList(Student.brass).contains(this.instrument)) {
                return true;
            }
        }
        
        return false;
    }
}
