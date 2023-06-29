package com.csi.helloworld.Tutor;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TutorService {
    @Autowired
    private TutorRepository tutorRepository;
    
    //CRUD testing

    //create

    
    public Tutor addTutor(Tutor tutor) {
        return tutorRepository.save(tutor);
    }
    
    //read
    
    public List<Tutor> findAllTutors() {
        return tutorRepository.findAll();
    }
    public Optional<Tutor> getTutorByObjectID(ObjectId id) {
        return tutorRepository.findById(id);
    }

    public Optional<Tutor> getTutorByFirstName(String firstName) {
        return tutorRepository.findTutorByFirstName(firstName);
    }
    public Optional<Tutor> getTutorByKisdID(String kisdID) {
        return tutorRepository.findTutorByKisdID(kisdID);
    }

    //delete

    public String deleteTutor(String kisdID) {
        tutorRepository.deleteTutorByKisdID(kisdID);
        return kisdID + " deleted from dashboard";
    }
}