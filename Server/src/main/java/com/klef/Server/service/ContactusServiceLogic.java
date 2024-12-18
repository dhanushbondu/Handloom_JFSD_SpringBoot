package com.klef.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.server.entity.Contactus;
import com.klef.server.repo.ContactusRepo;

@Service
public class ContactusServiceLogic implements ContactusService {

    @Autowired
    private ContactusRepo contactusrepo;

    @Override
    public String insertContactData(Contactus contactus) {
        try {
            Contactus savedContactus = contactusrepo.save(contactus);  // Saving to the database
            if (savedContactus != null) {
                return "Thank you for contacting us! We have received your message.";
            }
        } catch (Exception e) {
            return "There was an error while submitting your message. Please try again later.";
        }
        return null; // In case something goes wrong and no data is saved
    }
}
