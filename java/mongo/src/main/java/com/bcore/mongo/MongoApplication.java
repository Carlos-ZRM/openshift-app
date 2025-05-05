package com.bcore.mongo;

import java.net.InetSocketAddress;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.RequestMapping;



@SpringBootApplication
@EnableMongoRepositories
@RestController

@RequestMapping("/")



public class MongoApplication {

  @Autowired
  private IpInfoRepository ipInfoRepository;

  @RequestMapping()
  public GetInfo getInfo(HttpServletRequest request, @RequestHeader HttpHeaders headers) {
  InetSocketAddress host = headers.getHost();
  GetInfo info = new GetInfo();

  info.setLocalAddr(request.getLocalAddr());
  info.setLocalName(request.getLocalName());
  info.setLocalPort(request.getLocalPort());


  info.setRemoteAddr(request.getRemoteAddr());
  info.setRemotePort(request.getRemotePort());
  info.setRemoteName(request.getRemoteHost());

  info.setServerPort(request.getServerPort());
  info.setServerName(request.getServerName());
 
  
  
  String now = (new SimpleDateFormat("dd/MM/yyyy HH:mm:ss")).format(new Date());
  info.setDate(now);
  GetInfo save = this.ipInfoRepository.save(info);
  System.out.println( info.toString() );
  
  return save;
  }
  
  
  public static void main(String[] args) {
    SpringApplication.run(MongoApplication.class, args);
  }

}