package com.csi.helloworld.Student;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;
    
    //CRUD testing

    //create

    
    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }
    
    //read
    
    public List<Student> findAllStudents() {
        return studentRepository.findAll();
    }
    public Optional<Student> getStudentByObjectID(ObjectId id) {
        return studentRepository.findById(id);
    }

    public Optional<Student> getStudentByFirstName(String firstName) {
        return studentRepository.findStudentByFirstName(firstName);
    }
    public Optional<Student> getStudentByKisdID(String kisdID) {
        return studentRepository.findStudentByKisdID(kisdID);
    }

    //update

    public Student updateCurrentTutor(Student studentRequest) {
        //get the existing document from DB
        //populate new kisdID from request to existing object/entity/document
        Student existingStudent = studentRepository.findById(studentRequest.getId()).get();
        existingStudent.setCurrentTutor(studentRequest.getCurrentTutor());
        
        return studentRepository.save(existingStudent);
    }

    //delete

    public String deleteStudent(String kisdID) {
        studentRepository.deleteStudentByKisdID(kisdID);
        return kisdID + " deleted from dashboard";
    }
}