package com.fitadapt.dto;

public record ValidateRehabResponseDTO(
        boolean esSeguro,
        String mensajeFeedback
) {}