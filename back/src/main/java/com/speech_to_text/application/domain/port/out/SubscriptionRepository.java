package com.speech_to_text.application.domain.port.out;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.speech_to_text.application.domain.model.DTO.SalesStatDTO;
import com.speech_to_text.application.domain.model.DTO.SubscriptionFilterDto;
import com.speech_to_text.application.domain.model.subscription.Subscription;

public interface SubscriptionRepository {
    public Page<Subscription> findByFilters(SubscriptionFilterDto filter, Pageable pageable);
    public SalesStatDTO getSalesDashboardStat(LocalDate startDate, LocalDate endDate) throws Exception;
    public List<Subscription> cancelAtPeriodEnd(String id, LocalDate endPeriod);
    public List<Subscription> findByOwner(String subOwner);
    public List<Subscription> canceled(String id);
    public Subscription findById(String id);
    public Subscription save(Subscription subscription);
    public List<Subscription> findAll();
    public List<Subscription> findAllByAuth0Id(String auth0id);
    public Subscription findByCode(String code);
    public Page<Subscription> findAllByAuth0Id(String auth0id, Pageable pageable);
    public Subscription update(Subscription subscription);
}
