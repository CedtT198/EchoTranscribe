package com.speech_to_text.application.domain.port.in;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.speech_to_text.application.domain.model.DTO.UserFilterDto;
import com.speech_to_text.application.domain.model.DTO.UsersStatDTO;
import com.speech_to_text.application.domain.model.user.User;

public  interface UserUseCase {
    public int getTotalUser(LocalDate startDate, LocalDate endDate);
    public UsersStatDTO getUsersDashboardStat(LocalDate startDate, LocalDate endDate) throws Exception;
    public Page<User> findByFilters(UserFilterDto filter, Pageable pageable);
    public List<User> findAll();
    public List<User> findByAbonnements(LocalDate date1, LocalDate date2, String typeAbonnement);
    public User findByAuth0Id(String auth0Id);
    public User findByMail(String mail);
    public User save(User user);
    public User getOrCreate(String auth0Id, String email);
    public User update(User user)  throws Exception;
    public boolean delete(String auth0Id);
    public boolean block(String auth0Id);
}
