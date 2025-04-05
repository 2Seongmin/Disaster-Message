package com.example.back.spring.shelter.controller;

import com.example.back.spring.message.model.service.MessageService;
import com.example.back.spring.shelter.model.service.ShelterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/shelter")
@RequiredArgsConstructor
public class ShelterController {

    private final ShelterService shelterService;

    @GetMapping
    public String getAllMessages(@RequestParam(defaultValue = "1") int pageNo) {
        return shelterService.allShleters(pageNo);
    }

}
