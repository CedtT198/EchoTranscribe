package com.speech_to_text.application.domain.port.out;

import java.time.LocalDate;
import java.util.List;
import com.speech_to_text.application.domain.model.DTO.UserFilterDto;
import com.speech_to_text.application.domain.model.DTO.UsersStatDTO;
import com.speech_to_text.application.domain.model.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public  interface UserRepository {
    public int getTotalUser(LocalDate startDate, LocalDate endDate);
    public UsersStatDTO getUsersDashboardStat(LocalDate startDate, LocalDate endDate) throws Exception;
    public Page<User> findByFilters(UserFilterDto filter, Pageable pageable);
    public List<User> findAll();
    public List<User> findByAbonnements(LocalDate date1, LocalDate date2, String typeAbonnement);
    public User findById(String id);
    public User findByMail(String mail);
    public User findByAuth0Id(String auth0Id);
    public User save(User user);
    public User update(User user);
    public boolean delete(String auth0Id);
}
