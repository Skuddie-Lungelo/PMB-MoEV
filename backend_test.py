#!/usr/bin/env python3
"""
Backend Test for Living Hope Church Website
==========================================

This is a frontend-only React application, so there's no traditional backend API to test.
However, this file documents the testing approach and findings for the application.

Application Architecture:
- React TypeScript application using Vite
- JSON-based content management system
- AI chat assistant using Gemini API (with fallback responses)
- Modern design with earth tones and pink accents
- Responsive design with mobile support

Testing Approach:
1. Manual content verification
2. URL accessibility testing
3. JSON content loading verification
4. Application structure analysis
"""

import requests
import json
import sys
from datetime import datetime

class FrontendTester:
    def __init__(self, base_url="http://localhost:5176/living-hope-church"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, test_func):
        """Run a single test"""
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            success = test_func()
            if success:
                self.tests_passed += 1
                print(f"✅ Passed")
            else:
                print(f"❌ Failed")
            return success
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False

    def test_main_page_accessibility(self):
        """Test if main page is accessible"""
        try:
            headers = {'User-Agent': 'Mozilla/5.0 (compatible; TestBot/1.0)'}
            response = requests.get(self.base_url, timeout=10, headers=headers)
            success = response.status_code == 200
            if success:
                # Check for key elements in HTML
                html_content = response.text
                has_title = "Living Hope Church" in html_content
                has_root = 'id="root"' in html_content
                has_react_script = "index.tsx" in html_content
                
                print(f"✅ Status: {response.status_code}")
                print(f"✅ Title found: {has_title}")
                print(f"✅ Root element found: {has_root}")
                print(f"✅ React script found: {has_react_script}")
                
                return has_title and has_root and has_react_script
            else:
                print(f"❌ HTTP Status: {response.status_code}")
                return False
        except Exception as e:
            print(f"❌ Request failed: {str(e)}")
            return False

    def test_content_files_accessibility(self):
        """Test if JSON content files are accessible"""
        content_files = [
            "/content/about.json",
            "/content/contact.json", 
            "/content/church-info.json"
        ]
        
        for file_path in content_files:
            url = f"{self.base_url}{file_path}"
            response = requests.get(url)
            if response.status_code != 200:
                print(f"❌ Failed to access {file_path}")
                return False
            
            try:
                json.loads(response.text)
                print(f"✅ {file_path} - Valid JSON")
            except json.JSONDecodeError:
                print(f"❌ {file_path} - Invalid JSON")
                return False
        
        return True

    def test_static_assets(self):
        """Test if static assets are accessible"""
        assets = [
            "/index.css",
            "/vite.svg"
        ]
        
        for asset in assets:
            url = f"{self.base_url}{asset}"
            response = requests.get(url)
            if response.status_code != 200:
                print(f"❌ Failed to access {asset}")
                return False
            print(f"✅ {asset} - Accessible")
        
        return True

    def test_content_structure(self):
        """Test content structure and completeness"""
        # Test about.json structure
        response = requests.get(f"{self.base_url}/content/about.json")
        about_data = response.json()
        
        required_keys = ['hero', 'story', 'mission', 'vision', 'values']
        for key in required_keys:
            if key not in about_data:
                print(f"❌ Missing key '{key}' in about.json")
                return False
        
        # Test contact.json structure
        response = requests.get(f"{self.base_url}/content/contact.json")
        contact_data = response.json()
        
        required_keys = ['address', 'phone', 'email', 'serviceTime', 'socialMedia']
        for key in required_keys:
            if key not in contact_data:
                print(f"❌ Missing key '{key}' in contact.json")
                return False
        
        print("✅ All content files have required structure")
        return True

def main():
    """Main test execution"""
    print("=" * 60)
    print("LIVING HOPE CHURCH WEBSITE TESTING")
    print("=" * 60)
    print(f"Test started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    tester = FrontendTester()
    
    # Run tests
    tester.run_test("Main Page Accessibility", tester.test_main_page_accessibility)
    tester.run_test("Content Files Accessibility", tester.test_content_files_accessibility)
    tester.run_test("Static Assets", tester.test_static_assets)
    tester.run_test("Content Structure", tester.test_content_structure)
    
    # Print results
    print("\n" + "=" * 60)
    print("TEST RESULTS")
    print("=" * 60)
    print(f"📊 Tests passed: {tester.tests_passed}/{tester.tests_run}")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed! The application is serving content correctly.")
        print("\nKey Findings:")
        print("✅ React application is properly configured")
        print("✅ JSON content management system is working")
        print("✅ Static assets are accessible")
        print("✅ Content structure is complete and valid")
        print("✅ Application is ready for frontend testing")
    else:
        print("⚠️ Some tests failed. Check the issues above.")
    
    print(f"\nTest completed at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())