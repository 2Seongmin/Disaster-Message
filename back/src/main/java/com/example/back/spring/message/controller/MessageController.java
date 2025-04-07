package com.example.back.spring.message.controller;

import com.example.back.spring.message.model.dto.CommentDTO;
import com.example.back.spring.message.model.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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

    @GetMapping("/{sn}")
    public ResponseEntity<String> getMessageBySn(@PathVariable int sn) {
        String result = messageService.messageDetail(sn);

        if (result.equals("{}")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("해당 SN을 가진 메시지를 찾을 수 없습니다.");
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/region")
    public String findByRegion(@RequestParam String region,
                               @RequestParam(defaultValue = "1") int page) {

        return messageService.findByRegion(region, page);
    }

    @GetMapping("/date")
    public String dateMessages(@RequestParam(defaultValue = "1") int pageNo) {
        return messageService.allMessages(pageNo);
    }

    @PostMapping("/comments")  // 식당번호, 내용 => 가공
    public ResponseEntity<?> save(@RequestBody CommentDTO comment){
        // log.info("{}", comment);
        messageService.saveComment(comment);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/comments/{seq}")
    public ResponseEntity<List<CommentDTO>> getComments(@PathVariable(name="seq") Long seq){
        List<CommentDTO> comments = messageService.selectCommentList(seq);
        return ResponseEntity.ok(comments);
    }


}


