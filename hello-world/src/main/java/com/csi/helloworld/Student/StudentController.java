package com.csi.helloworld.Student;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/v1/students")
public class StudentController {

    @Autowired
    private StudentService studentService;



    @PostMapping("/newStudent")
    //@ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Void> createStudent(@RequestBody Student student) {
        studentService.addStudent(student);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/all")
    public ResponseEntity<List<Student>> getAllStudents() {
        //return studentService.findAllStudents();
        return new ResponseEntity<List<Student>>(studentService.findAllStudents(), HttpStatus.OK);
    }
    
    @GetMapping("/id/{id}")
    public ResponseEntity<Optional<Student>> getStudentByObjectID(@PathVariable ObjectId id) {
        return new ResponseEntity<Optional<Student>>(studentService.getStudentByObjectID(id), HttpStatus.OK);
    }

    @GetMapping("/kisdID/{kisdID}")
    public ResponseEntity<Optional<Student>> getStudentByKisdID(@PathVariable String kisdID) {
        return new ResponseEntity<Optional<Student>>(studentService.getStudentByKisdID(kisdID), HttpStatus.OK);
    }

    @GetMapping("/firstName/{firstName}")
    public ResponseEntity<Optional<Student>> getStudentByFirstName(@PathVariable String firstName) {
        return new ResponseEntity<Optional<Student>>(studentService.getStudentByFirstName(firstName), HttpStatus.OK);
    }


    @GetMapping("/connectStudent/{tutorKisdID}/{studentKisdID}") //CHANGED FROM PUT
    public void connectLesson(@PathVariable String tutorKisdID, @PathVariable String studentKisdID) {
        Student updatedStudent = studentService.getStudentByKisdID(studentKisdID).get().scheduleLesson(tutorKisdID);
        studentService.updateCurrentTutor(updatedStudent);
    }

    @GetMapping("/disconnectStudent/{tutorKisdID}/{studentKisdID}") //CHANGED FROM PUT
    public void disconnectLesson(@PathVariable String tutorKisdID, @PathVariable String studentKisdID) {
        Student updatedStudent = studentService.getStudentByKisdID(studentKisdID).get().unscheduleLesson(tutorKisdID);
        studentService.updateCurrentTutor(updatedStudent);
    }


    @DeleteMapping("/{kisdID}")
    public String deleteStudent(@PathVariable String kisdID) {
        return studentService.deleteStudent(kisdID);
    }

    
}