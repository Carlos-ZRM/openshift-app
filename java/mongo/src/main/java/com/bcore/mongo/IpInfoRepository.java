package com.bcore.mongo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IpInfoRepository extends MongoRepository<GetInfo, String> {
    
}
