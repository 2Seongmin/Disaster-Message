package com.example.back.spring.message.model.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MessageDTO {
    private int SN;
    private String RCPTN_RGN_NM;
    private String DST_SE_NM;
    private String EMRG_STEP_NM;
    private String MSG_CN;
    private String CRT_DT;
}
