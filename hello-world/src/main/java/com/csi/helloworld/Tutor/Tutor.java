package com.csi.helloworld.Tutor;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.csi.helloworld.Student.Student;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "tutors")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Tutor {

    @Id
    private ObjectId id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private String band;
    private String instrument;
    private String kisdID;
    private String password;
    private String settingPreference;
    //private int distinctionScore;
    private int grade;

    public static ArrayList<Student> tutorWaitingList(Tutor tutor, ArrayList<Student> waitingListMaster) {
        ArrayList<Student> waitingList = new ArrayList<>();
    
        for (Student student : waitingListMaster) {
            if (student.playsSameOrSimilarInstrument(tutor)) {
                waitingList.add(student);
            }
        }
    
        Collections.sort(waitingList, new Comparator<Student>() {
            @Override
            public int compare(Student s1, Student s2) {
                int score1 = calculateTeachingPriorityScore(s1, tutor);
                int score2 = calculateTeachingPriorityScore(s2, tutor);
                return score1 - score2;
            }
        });
    
        return waitingList;
    }
    
    private static int calculateTeachingPriorityScore(Student student, Tutor tutor) {
        
        int score = 0;
    
        int gradeLevel = student.getGrade();
        if (gradeLevel == 6) {
            score += 0;
        } 
        else if (gradeLevel == 7) {
            score += 1;
        } 
        else if (gradeLevel == 8) {
            score += 3;
        }
    
        String bandLevel = student.getBand();

        if (bandLevel.equals("Beginner")) {
            score += 0;
        } 
        else if (bandLevel.equals("Lyric")) {
            score += 0;
        } 
        else if (bandLevel.equals("Concert")) {
            score += 1;
        } 
        else if (bandLevel.equals("Symphonic")) {
            score += 3;
        }
    
        if (student.isCurrentlyInLessons()) {
            score += 4;
        } 
        else {
            score += 0;
        }
    
        String studentInstrument = student.getInstrument();
        String tutorInstrument = tutor.getInstrument();
        
        if (studentInstrument.equals(tutorInstrument)) {
            score += 0;
        }
    
        else if (Arrays.asList(Student.saxophones).contains(studentInstrument) && Arrays.asList(Student.saxophones).contains(tutorInstrument)) {
            score += 2;
        }
    
        else if (Arrays.asList(Student.clarinets).contains(studentInstrument) && Arrays.asList(Student.clarinets).contains(tutorInstrument)) {
            score += 2;
        }

        else if (Arrays.asList(Student.brass).contains(studentInstrument) && Arrays.asList(Student.brass).contains(tutorInstrument)) {
            score += 8;
        }
    
        else if (Arrays.asList(Student.woodwinds).contains(studentInstrument) && Arrays.asList(Student.woodwinds).contains(tutorInstrument)) {
            score += 10;
        }
    
        else {
            score += 25;
        }
        
        return score;
    }
    
}