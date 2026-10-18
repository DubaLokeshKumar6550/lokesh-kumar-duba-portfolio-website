package com.lokesh.portfolio.controller;

import com.lokesh.portfolio.dto.ApiResponse;
import com.lokesh.portfolio.model.ContactMessage;
import com.lokesh.portfolio.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ContactController {

    @Autowired
    private MessageService messageService;

    // Public contact submission
    @PostMapping("/contact")
    public ResponseEntity<ApiResponse<ContactMessage>> submitMessage(@RequestBody ContactMessage message) {
        if (message.getName() == null || message.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Name is required."));
        }
        if (message.getEmail() == null || message.getEmail().trim().isEmpty() || !message.getEmail().contains("@")) {
            return ResponseEntity.badRequest().body(ApiResponse.error("A valid email address is required."));
        }
        if (message.getMessage() == null || message.getMessage().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Message content cannot be empty."));
        }

        ContactMessage saved = messageService.saveMessage(message);
        return ResponseEntity.ok(ApiResponse.ok("Message sent successfully! Thank you for reaching out.", saved));
    }

    // Protected Admin message view
    @GetMapping("/admin/messages")
    public ResponseEntity<ApiResponse<List<ContactMessage>>> getAllMessages() {
        return ResponseEntity.ok(ApiResponse.ok(messageService.getAllMessages()));
    }

    @PatchMapping("/admin/messages/{id}/read")
    public ResponseEntity<ApiResponse<Void>> markAsRead(@PathVariable Long id) {
        messageService.markAsRead(id);
        return ResponseEntity.ok(ApiResponse.ok("Message marked as read", null));
    }

    @DeleteMapping("/admin/messages/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteMessage(@PathVariable Long id) {
        messageService.deleteMessage(id);
        return ResponseEntity.ok(ApiResponse.ok("Message deleted successfully", null));
    }
}
