//
//  LogViewController.swift
//  DigiMeSDKExampleSwift
//
//  Created on 22/02/2018.
//  Copyright © 2018 digi.me. All rights reserved.
//

import UIKit

class LogViewController: UIView {
  
  var textView: UITextView!
  var currentFontSize: CGFloat = 10
  
  fileprivate let loggingViewMaxFontSize: CGFloat = 28
  fileprivate let loggingViewMinFontSize: CGFloat = 2
  fileprivate let loggingViewDefaultFont: String = "Courier-Bold"
  
  override init(frame: CGRect) {
    
    super.init(frame: frame)
    generateTextView()
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  func increaseFontSize() {
    guard currentFontSize < loggingViewMaxFontSize else {
        return
    }
    
    currentFontSize = currentFontSize + 1
    textView.font = UIFont (name: loggingViewDefaultFont, size: currentFontSize)
  }
  
  func decreaseFontSize() {
    guard currentFontSize > loggingViewMinFontSize else {
        return
    }
    
    currentFontSize = currentFontSize - 1
    textView.font = UIFont (name: loggingViewDefaultFont, size: currentFontSize)
  }
  
  func reset() {
    
    if let textView = textView {
      textView.removeFromSuperview()
    }
    generateTextView()
  }
  
  func generateTextView() {
    
    textView = UITextView(frame: frame)
    textView.backgroundColor = .black
    textView.isEditable = false
    textView.font = UIFont (name: loggingViewDefaultFont, size: currentFontSize)
    textView.textColor = .white
    textView.text = ""
    textView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    addSubview(textView)
    bringSubview(toFront: textView)
  }
  
  func scrollToBottom() {
    
    let stringLength:Int = textView.text.count
    textView.scrollRangeToVisible(NSMakeRange(stringLength-1, 1))
  }
  
  func log(message: String) {
    guard !message.isEmpty else {
        return
    }
    
    let now = Date()
    let formatter = DateFormatter()
    formatter.dateFormat = "yyyy-MM-dd HH:mm:ss.SSS"
    let dateString = formatter.string(from: now)
    textView.text = textView.text + "\n" + dateString + " " + message
    scrollToBottom()
  }
}
