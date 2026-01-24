package com.speech_to_text.application.domain.service.withDependance;

import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.speech_to_text.application.domain.model.DTO.SalesStatDTO;
import com.speech_to_text.application.domain.model.DTO.SubscriptionFilterDto;
import com.speech_to_text.application.domain.model.subscription.Subscription;
import com.speech_to_text.application.domain.port.in.SubscriptionUseCase;
import com.speech_to_text.application.domain.port.out.SubscriptionRepository;

@Service
public class SubscriptionService implements SubscriptionUseCase {

    @Value("${subscription.sharing.maxuser}")
    private int maxSharingSub;

    private final SubscriptionRepository subRepo;

    public SubscriptionService(SubscriptionRepository subRepo) {
        this.subRepo = subRepo;
    }

    @Override
    public Page<Subscription> findByFilters(SubscriptionFilterDto filter, Pageable pageable) {
        return subRepo.findByFilters(filter, pageable);
    }
    
    @Override
    public SalesStatDTO getSalesDashboardStat(LocalDate startDate, LocalDate endDate) throws Exception {
        return subRepo.getSalesDashboardStat(startDate, endDate);
    }

    @Override
    public Subscription useInvicationCode(String auth0Id, String email, String code) throws Exception {
        Subscription mainSub = subRepo.findByCode(code);
        if (mainSub == null) {
            throw new Exception("Code doesn't exist.");
        }

        String owner = mainSub.getSubscriptionOwner();
        List<Subscription> subs = subRepo.findByOwner(owner);
        if (subs.size() >= maxSharingSub) { 
            throw new Exception("This subscription has reached its maximum number of users. Use another code.");
        }

        Subscription sub = new Subscription(
            null,
            auth0Id,
            email,
            mainSub.getSubscriptionType(),
            mainSub.getStatus(),
            LocalDate.now(),
            null,
            null,
            mainSub.getSubscriptionOwner(),
            null
        ); 
        return subRepo.save(sub);
    }

    @Override
    public List<Subscription> cancelAtPeriodEnd(String id, LocalDate endPeriod) {
        return subRepo.cancelAtPeriodEnd(id, endPeriod);
    }

    @Override
    public List<Subscription> canceled(String id) {
        return subRepo.canceled(id);
    }

	@Override
	public List<Subscription> findAllByAuth0Id(String auth0id) {
        return subRepo.findAllByAuth0Id(auth0id);
	}

    @Override
    public Subscription findActualSub(String auth0id) {
        Subscription subFreePlan = new Subscription(null, auth0id, null, "Free plan", null, null, null, null,  auth0id, null);

        List<Subscription> allSub = subRepo.findAllByAuth0Id(auth0id);
        if (!allSub.isEmpty()) {
            Subscription recentSub = allSub.get(0);

            String status = recentSub.getStatus();
            String lowerCasePlan = recentSub.getSubscriptionType().toLowerCase();

            if (lowerCasePlan.equals("free plan") || status.equals("CANCELED")) {
                return subFreePlan;
            }

            if (status.equals("ACTIVE") || status.equals("CANCEL_AT_PERIOD_END")) {
                return recentSub;
            }
        }
        return subFreePlan;
    }

    @Override
    public Subscription save(Subscription subscription) {
        return subRepo.save(subscription);
    }

    @Override
    public Page<Subscription> findAllByAuth0Id(String auth0id, Pageable pageable) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAllByAuth0Id'");
    }

}
