package com.saurabh.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.saurabh.domain.VerificationPurpose;
import com.saurabh.model.VerificationCode;

@Repository
public interface VerificationCodeRepository
        extends JpaRepository<VerificationCode, Long> {

    VerificationCode findByEmail(String email);
    VerificationCode findByEmailAndPurpose(
            String email,
            VerificationPurpose purpose
    );

    VerificationCode findByEmailAndOtp(
            String email,
            String otp
    );
}
