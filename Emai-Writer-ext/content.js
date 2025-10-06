// This script integrates buttons or other HTML elements into a webpage, specifically for Gmail.

//console.log("Content script loaded");

// Finds the compose toolbar in Gmail using a set of predefined selectors.
function findComposeToolBar() {
  const selectors = [".btC", ".aDh", '[role="toolbar"]', ".gU.Up"]; // Add more selectors as needed
  for (let selector of selectors) {
    const toolBar = document.querySelector(selector);
    if (toolBar) {
      return toolBar; // Return the toolbar element if found.
    }
    return null; // Return null if no toolbar is found.
  }
}

// Creates a "Generate Reply" button with specific styles and attributes.
function createGenerateReplyButton() {
  const button = document.createElement("div");
  button.className = "T-I J-J5-Ji aoO v7 T-I-atl L3"; // Gmail-specific classes for styling.
  button.style.marginRight = "8px";
  button.innerHTML = "Generate Reply";
  button.setAttribute("role", "button");
  button.setAttribute("data-tooltip", "Generate AI Reply");
  return button; // Return the created button element.
}

function createToneDropdown() {
  const dropDown = document.createElement("select");
  dropDown.id = "tone-select";
  const tones = [
    { value: "Professional", text: "Professional" },
    { value: "Casual", text: "Casual" },
    { value: "Friendly", text: "Friendly" },
    { value: "Formal", text: "Formal" },
  ];

  tones.forEach((data) => {
    const option = document.createElement("option");
    option.value = data.value;
    option.text = data.text;
    dropDown.appendChild(option);
  });
  dropDown.setAttribute("role", "dropdown");

  return dropDown;
}

// Injects the "Generate Reply" button into the Gmail compose toolbar.
function injectButton() {
  const existingDropdown = document.querySelector("select-tone");
  const existingButton = document.querySelector(".ai-reply-button");
  // Use querySelector to find and remove any existing button to avoid duplicates.
  if (existingButton || existingDropdown) {
    existingButton.remove();
    existingDropdown.remove();
  }

  const toolBar = findComposeToolBar();
  if (!toolBar) {
    //console.log("Tool bar not found");
    return; // Exit if no toolbar is found.
  }

  // Retrieves the content of the email being composed.
  function getEmailContent() {
    const selectors = [
      ".h7",
      ".a3s.aiL",
      ".ii.gt",
      '[role="presentation"]',
      ".gmail_quote",
    ]; // Add more selectors as needed
    let selectedTone = "Professional"; // Default tone
    for (let selector of selectors) {
      const content = document.querySelector(selector);
      if (content) {
        return content.innerText.trim(); // Return the trimmed text content if found.
      }
      return ""; // Return an empty string if no content is found.
    }
  }

  //console.log("Tool bar found");
  const newButton = createGenerateReplyButton();
  const toneDropdown = createToneDropdown();
  toneDropdown.classList.add("tone-dropdown");
  toneDropdown.addEventListener("change", (event) => {
    selectedTone = event.target.value;
    console.log("Selected tone:", selectedTone);
  });
  newButton.classList.add("ai-reply-button");
  newButton.addEventListener("click", async () => {
    try {
      newButton.innerHTML = "Generating...";
      newButton.disabled = true; // Disable the button to prevent multiple clicks.

      const emailContent = getEmailContent(); // Get the email content.
      //console.log("Email content:", emailContent);

      const response = await fetch("http://localhost:8080/api/email/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailContent: emailContent,
          tone: selectedTone,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const generatedData = await response.text();
      //console.log("Generated data:", generatedData);

      const composeBox = document.querySelector(
        '[role="textbox"][g_editable="true"]'
      );

      if (composeBox) {
        composeBox.focus();
        document.execCommand("insertText", false, generatedData); // Insert the generated reply into the compose box.
      } else {
        console.error("Compose box not found");
      }
    } catch (error) {
      console.error("Error generating reply:", error);
    } finally {
      newButton.innerHTML = "Generate Reply";
      newButton.disabled = false; // Re-enable the button.
    }
  });

  toolBar.insertBefore(newButton, toolBar.firstChild); // Insert the button at the start of the toolbar.
  toolBar.insertBefore(toneDropdown, newButton.nextSibling); // Insert the dropdown next to the button.
  //console.log("Button injected");
}

// MutationObserver monitors changes in the DOM to dynamically inject the button when needed.
// This avoids the need for continuous polling.
const observer = new MutationObserver((mutations) => {
  for (let mutation of mutations) {
    const addedNodes = Array.from(mutation.addedNodes); // Convert added nodes to an array.
    const hasComponentElements = addedNodes.some(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        (node.matches('.aDh, .btC, [role="dialog"]') ||
          node.querySelector('.aDh, .btC, [role="dialog"]'))
    );
    if (hasComponentElements) {
      //console.log("Element found");
      setTimeout(injectButton, 250); // Wait for 250ms to ensure the element is fully loaded.
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true, // Observe changes in all child elements.
});
