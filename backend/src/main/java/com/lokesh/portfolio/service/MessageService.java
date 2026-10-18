package com.lokesh.portfolio.service;

import com.lokesh.portfolio.model.ContactMessage;
import com.lokesh.portfolio.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    public ContactMessage saveMessage(ContactMessage message) {
        return contactMessageRepository.save(message);
    }

    public List<ContactMessage> getAllMessages() {
        return contactMessageRepository.findAllByOrderByCreatedAtDesc();
    }

    public void markAsRead(Long id) {
        contactMessageRepository.findById(id).ifPresent(msg -> {
            msg.setIsRead(true);
            contactMessageRepository.save(msg);
        });
    }

    public void deleteMessage(Long id) {
        contactMessageRepository.deleteById(id);
    }
}
