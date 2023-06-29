package com.csi.helloworld.Tutor;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
//import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface TutorRepository extends MongoRepository<Tutor, ObjectId> {

    Optional<Tutor> findTutorByFirstName(String FirstName);
    Optional<Tutor> findTutorByKisdID(String kisdID);

    Optional<Tutor> deleteTutorByKisdID(String kisdID);

}