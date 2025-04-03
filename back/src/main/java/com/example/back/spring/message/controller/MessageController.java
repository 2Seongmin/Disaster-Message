package com.example.back.spring.message.controller;

import com.example.back.spring.message.model.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/message")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @GetMapping
    public ResponseEntity<String> requestMessages(@RequestParam(name = "pageNo", defaultValue = "1") int pageNo) {

        String responseData = messageService.requestMessages(pageNo);

        log.info(responseData);
        return ResponseEntity.ok(responseData);
    }


}


