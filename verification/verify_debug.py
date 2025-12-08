from playwright.sync_api import sync_playwright

def verify_homepage():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Capture console messages
        page.on("console", lambda msg: print(f"Console: {msg.text}"))
        page.on("pageerror", lambda exc: print(f"Page error: {exc}"))

        try:
            print("Navigating to http://localhost:5173")
            response = page.goto("http://localhost:5173", timeout=60000)
            print(f"Response status: {response.status}")

            # Wait for content to load
            print("Waiting for h1...")
            # Increased timeout slightly
            page.wait_for_selector('h1', state='visible', timeout=10000)

            # Check for title
            assert "Methsara" in page.content()

            # Take a screenshot
            page.screenshot(path="verification/homepage.png")
            print("Screenshot saved to verification/homepage.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
            print("Screenshot saved to verification/error.png")

        finally:
            browser.close()

if __name__ == "__main__":
    verify_homepage()
