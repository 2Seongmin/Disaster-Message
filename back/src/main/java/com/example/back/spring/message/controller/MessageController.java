package com.example.back.spring.message.controller;

import com.example.back.spring.message.model.dto.MessageDTO;
import com.example.back.spring.message.model.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.message.Message;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/message")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @GetMapping
    public String getAllMessages(@RequestParam(defaultValue = "1") int pageNo) {
        return messageService.allMessages(pageNo);
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> getMessageById(@PathVariable("id") String sn) {
        String messageJson = messageService.getMessageById(sn);
        if (!messageJson.equals("{}")) {
            return ResponseEntity.ok(messageJson);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



}


