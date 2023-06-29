package com.csi.helloworld.Student;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
//import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface StudentRepository extends MongoRepository<Student, ObjectId> {

    Optional<Student> findStudentByFirstName(String FirstName);
    Optional<Student> findStudentByKisdID(String kisdID);

    Optional<Student> deleteStudentByKisdID(String kisdID);

}
