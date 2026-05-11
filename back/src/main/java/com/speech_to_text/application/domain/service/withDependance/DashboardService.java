package com.speech_to_text.application.domain.service.withDependance;

import java.time.LocalDate;
import org.springframework.stereotype.Service;
import com.speech_to_text.application.domain.model.DTO.GeneralStatDTO;
import com.speech_to_text.application.domain.model.DTO.SalesStatDTO;
import com.speech_to_text.application.domain.port.in.DashboardUseCase;
import com.speech_to_text.application.domain.port.in.ReviewUseCase;
import com.speech_to_text.application.domain.port.in.SubscriptionUseCase;
import com.speech_to_text.application.domain.port.in.TranscriptionUseCase;
import com.speech_to_text.application.domain.port.in.UserUseCase;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DashboardService implements DashboardUseCase {

    private final ReviewUseCase reviewUseCase;
    private final UserUseCase userUseCase;
    private final TranscriptionUseCase transUseCase;
    private final SubscriptionUseCase subUseCase;

    @Override
    public GeneralStatDTO getGeneralDashboardStat(LocalDate startDate, LocalDate endDate) throws Exception {
        GeneralStatDTO stat = new GeneralStatDTO();

        int totalUsers = userUseCase.getTotalUser(startDate, endDate);
        double totalHoursTrans = transUseCase.getTotalHoursTranscribed(startDate, endDate);
        double avgStars = reviewUseCase.getReviewStatistics().getAverageStar();
        SalesStatDTO salesStat = subUseCase.getSalesDashboardStat(startDate, endDate);

        stat.setTotalUsers(totalUsers);
        stat.setTotalHoursTranscribed(Math.round(totalHoursTrans * 10.0) / 10.0);
        stat.setAverageReview(avgStars);
        stat.setAverageMonthlySales(salesStat.getAverageMonthlySales());
        stat.setTotalChurn(salesStat.getAverageChurn());
        stat.setTotalSales(salesStat.getAllTimeSales());
        stat.setSubscriptionsRepartition(salesStat.getSubscriptionsRepartition());
        stat.setSubscriptions(salesStat.getSubscriptions());

        return stat;
    }
    
}
