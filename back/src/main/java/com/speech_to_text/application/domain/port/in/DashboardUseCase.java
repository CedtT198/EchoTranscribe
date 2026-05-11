package com.speech_to_text.application.domain.port.in;

import java.time.LocalDate;
import com.speech_to_text.application.domain.model.DTO.GeneralStatDTO;

public interface DashboardUseCase {
    public GeneralStatDTO getGeneralDashboardStat(LocalDate startDate, LocalDate endDate) throws Exception;
}
