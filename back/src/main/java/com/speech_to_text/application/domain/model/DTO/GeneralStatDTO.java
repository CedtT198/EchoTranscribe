package com.speech_to_text.application.domain.model.DTO;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GeneralStatDTO {
    @JsonProperty("total_users")
    Integer totalUsers;
    
    @JsonProperty("total_hours_transcribed")
    Double totalHoursTranscribed;

    @JsonProperty("average_monthly_sales")
    Double averageMonthlySales;
    
    @JsonProperty("average_review")
    Double averageReview;
    
    @JsonProperty("total_churn")
    Double totalChurn;
    
    @JsonProperty("total_sales")
    Double totalSales;

    @JsonProperty("subscriptions_repartition")
    List<SubscriptionRepartitionDTO> subscriptionsRepartition;
    
    @JsonProperty("subscriptions")
    List<MonthlyCountDTO> subscriptions;
}
