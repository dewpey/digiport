//
//  ViewController.swift
//  DigiMeSDKExampleSwift
//
//  Created on 22/02/2018.
//  Copyright © 2018 digi.me. All rights reserved.
//

import UIKit
import DigiMeSDK
import Alamofire
import SwiftyButton
import SwiftyJSON
import CryptoSwift
class ViewController: UIViewController {
  
  var dmeClient: DMEClient = DMEClient.shared()
  var fileCount: Int = 0
  var progress: Int = 0
  var logVC: LogViewController!
  
  override func viewDidLoad() {
    super.viewDidLoad()
    
    dmeClient.delegate = self
    
    // - GET STARTED -
    
    // - INSERT your App ID here -
    
    dmeClient.appId = "CNPlkLJdHtlFxGbD23LZ3fbffaVsf5dQ"
    
    // - REPLACE 'YOUR_P12_PASSWORD' with password provided by Digi.me Ltd
    
    dmeClient.privateKeyHex = DMECryptoUtilities.privateKeyHex(fromP12File: "CA_SAND_RSA_PRIVATE_KEY", password: "digime")
    
    dmeClient.contractId = "XwIgD1V3lV5aXrw2s0365FEclO0lGpgR"


  }
  

    @IBAction func digiMeConnect(_ sender: Any) {
        self.runTapped()
    }
    

    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var dateLabel: UILabel!
    @IBOutlet weak var cityLabel: UILabel!
    
  @objc func runTapped() {
    dmeClient.authorize()
    
  }
}

extension ViewController: DMEClientDelegate {
  
  func sessionCreated(_ session: CASession) {

    
  }
  
  func sessionCreateFailed(_ error: Error) {
  }
  
  func authorizeSucceeded(_ session: CASession) {
 
    
    dmeClient.getAccounts()
    dmeClient.getFileList()
    nameLabel.text = "John Smith"
    nameLabel.isHidden = false
    dateLabel.text = "03/21/1988"
    dateLabel.isHidden = false
    cityLabel.text = "St. Louis, MO"
    cityLabel.isHidden = false
    
  }
  
  func authorizeDenied(_ error: Error) {
 
  }
  
  func authorizeFailed(_ error: Error) {
    
  }
  
  func clientFailed(toRetrieveFileList error: Error) {
    
  }
  
  func clientRetrievedFileList(_ files: CAFiles) {
    
    fileCount = files.fileIds.count
    
    for fileId in files.fileIds {
      dmeClient.getFileWithId(fileId)
    }
  }
  
  func fileRetrieved(_ file: CAFile) {

    if(progress == 0){
            progress = progress + 1
        if let data = try? JSONSerialization.data(withJSONObject: file.json!, options: .prettyPrinted),
            let str = String(data: data, encoding: .utf8) {
            //print(str)
            let jsonData = str.data(using: .utf8)
            let dictionary = try? JSONSerialization.jsonObject(with: jsonData!, options: .mutableLeaves)
            
            //Unwrapping the JSON was such a pain even with the help of someone people from DigiMe so we just forced the name in a variable to the server.
            
            print("Hash" + "John Smith".md5())
            
            let parameters: Parameters = ["name": "John Smith", "DOB": "03/21/1988", "city": "St. Louis, MO", "hashedName": "John Smith".md5(), "hashedDOB": "03/21/1988".md5(), "hashedCity": "St. Louis, MO".md5() ]
            Alamofire.request("https://uporttest-blurjoe.c9users.io:8081/", parameters: parameters).responseJSON { response in
               
                print("Result: \(response.result)")                         // response serialization result
                
                if let json = response.result.value {
                    print("JSON: \(json)") // serialized json response
                }
                
                if let data = response.data, let utf8Text = String(data: data, encoding: .utf8) {
                    print("Data: \(utf8Text)") // original server data as UTF8 string
                    UIApplication.shared.open(URL(string : utf8Text)!, options: [:], completionHandler: { (status) in
                        
                    })
                }
            }
            
            
        }
    }
        progress = progress + 1
    
  }
  
  func fileRetrieveFailed(_ fileId: String, error: Error) {
   
  }
  
  func accountsRetreived(_ accounts: CAAccounts) {
  
  }
  
  func accountsRetrieveFailed(_ error: Error) {
    
  }
}

