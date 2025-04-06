package com.example.back.spring.shelter.controller;

import com.example.back.spring.shelter.model.service.ShelterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/shelter")
@RequiredArgsConstructor
public class ShelterController {

    private final ShelterService shelterService;

    @GetMapping
    public String getAllMessages(@RequestParam(defaultValue = "1") int pageNo) {
        return shelterService.allShleters(pageNo);
    }

    @GetMapping("/{sn}")
    public ResponseEntity<String> getMessageBySn(@PathVariable String sn) {
        String result = shelterService.shelterDetail(sn);

        if (result.equals("{}")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("해당 SN을 가진 대피소를 찾을 수 없습니다.");
        }
        return ResponseEntity.ok(result);
    }

}
