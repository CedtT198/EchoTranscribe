package com.speech_to_text.application.domain.model.DTO;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SalesStatDTO {

    @JsonProperty("average_monthly_sales")
    Double averageMonthlySales;

    @JsonProperty("all_time_sales")
    Double allTimeSales;
    
    @JsonProperty("average_churn")
    Double averageChurn;
    
    @JsonProperty("subscriptions")
    List<MonthlyCountDTO> subscriptions;
    
    @JsonProperty("subscriptions_repartition")
    List<SubscriptionRepartitionDTO> subscriptionsRepartition;
}
