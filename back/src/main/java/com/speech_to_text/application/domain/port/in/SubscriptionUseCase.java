package com.speech_to_text.application.domain.port.in;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.speech_to_text.application.domain.model.DTO.SalesStatDTO;
import com.speech_to_text.application.domain.model.DTO.SubscriptionFilterDto;
import com.speech_to_text.application.domain.model.subscription.Subscription;

public interface SubscriptionUseCase {
    public Page<Subscription> findByFilters(SubscriptionFilterDto filter, Pageable pageable);
    public SalesStatDTO getSalesDashboardStat(LocalDate startDate, LocalDate endDate) throws Exception;
    public Subscription useInvicationCode(String auth0Id, String email, String code) throws Exception;
    public List<Subscription> cancelAtPeriodEnd(String id, LocalDate endPeriod);
    public List<Subscription> canceled(String id);
    public Subscription save(Subscription subscription);
    public Subscription findActualSub(String auth0id);
    public Page<Subscription> findAllByAuth0Id(String auth0id, Pageable pageable);
    public List<Subscription> findAllByAuth0Id(String auth0id);
}
