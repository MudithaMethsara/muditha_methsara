from playwright.sync_api import sync_playwright

def verify_resume():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to http://localhost:5173/resum.html")
            response = page.goto("http://localhost:5173/resum.html", timeout=10000)
            print(f"Response status: {response.status}")

            assert response.status == 200
            print("Resume page accessible.")

        except Exception as e:
            print(f"Error: {e}")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    verify_resume()
