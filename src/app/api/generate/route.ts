import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI("AIzaSyCQOtlPYQbiNKo5KZ7fuwhDcxvzC3cyGwc");

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { prompt, format = "json" } = body;

    // Validate input
    if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
      return NextResponse.json(
        { error: "Please provide a valid data description" },
        { status: 400 },
      );
    }

    // Construct the AI prompt with improved profiling based on format
    const aiPrompt = constructAIPrompt(prompt, format);

    // Call the Gemini API
    try {
      // Get the generative model
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      // Generate content
      const result = await model.generateContent(aiPrompt);
      const response = await result.response;
      const generatedText = response.text();

      // Return the generated data
      return NextResponse.json({ data: generatedText });
    } catch (aiError) {
      console.error("Gemini API error:", aiError);

      // Fall back to mock data if the API fails
      const mockData = generateMockData(prompt, format);
      return NextResponse.json({
        data: mockData,
        note: "Generated using fallback system due to API error",
      });
    }
  } catch (error) {
    console.error("Error generating data:", error);
    return NextResponse.json(
      { error: "Failed to generate data. Please try again." },
      { status: 500 },
    );
  }
}

// Function to construct a detailed AI prompt based on the requested format
function constructAIPrompt(prompt: string, format: string): string {
  // Base instructions for all formats
  let baseInstructions = `Generate synthetic data based on the following user request: ${prompt}\n\n`;

  // Format-specific instructions
  switch (format.toLowerCase()) {
    case "json":
      return `${baseInstructions}Please provide the data in valid JSON format with the following guidelines:\n
1. Use proper JSON syntax with double quotes for keys and string values
2. Include an array of objects with consistent structure
3. Ensure all field names are camelCase
4. Make sure the data is realistic and varied
5. Do not include any explanatory text outside the JSON structure
6. Format the JSON with proper indentation

The output should be ready to parse as JSON without any modifications.`;

    case "csv":
      return `${baseInstructions}Please provide the data in valid CSV format with the following guidelines:\n
1. Include a header row with column names
2. Use commas as separators
3. Properly escape any commas within field values using double quotes
4. Use consistent data types for each column
5. Do not include any explanatory text before or after the CSV data
6. Ensure the data is realistic and varied

The output should be ready to parse as CSV without any modifications.`;

    case "sql":
      return `${baseInstructions}Please provide the data as SQL INSERT statements with the following guidelines:\n
1. Include a CREATE TABLE statement with appropriate data types
2. Follow with INSERT statements for each data row
3. Use proper SQL syntax with semicolons at the end of each statement
4. Properly escape any special characters in string values
5. Use consistent table and column names
6. Do not include any explanatory text outside the SQL statements

The output should be ready to execute in a SQL database without modifications.`;

    case "xml":
      return `${baseInstructions}Please provide the data in valid XML format with the following guidelines:\n
1. Include a root element that contains all data items
2. Use consistent element names for each data item
3. Use attributes appropriately for metadata
4. Properly escape any special characters
5. Use proper XML syntax with closing tags
6. Do not include any explanatory text outside the XML structure

The output should be ready to parse as XML without any modifications.`;

    case "yaml":
      return `${baseInstructions}Please provide the data in valid YAML format with the following guidelines:\n
1. Use proper YAML syntax with consistent indentation
2. Include a list of items with consistent structure
3. Use appropriate data types (strings, numbers, booleans)
4. Properly format multi-line strings if needed
5. Do not include any explanatory text outside the YAML structure
6. Ensure the data is realistic and varied

The output should be ready to parse as YAML without any modifications.`;

    default:
      return `${baseInstructions}Provide the data in a clean, structured format that's ready to use.`;
  }
}

// Helper function to generate mock data based on the prompt and format
// This is used as a fallback if the Gemini API fails
function generateMockData(prompt: string, format: string): string {
  // Student data example since it was mentioned in the chat history
  const studentData = [
    {
      student_name: "Emma Johnson",
      student_id: 1001,
      grade: 9,
      honours: true,
      high_honours: false,
    },
    {
      student_name: "Liam Smith",
      student_id: 1002,
      grade: 10,
      honours: false,
      high_honours: false,
    },
    {
      student_name: "Olivia Brown",
      student_id: 1003,
      grade: 11,
      honours: true,
      high_honours: true,
    },
    {
      student_name: "Noah Davis",
      student_id: 1004,
      grade: 12,
      honours: true,
      high_honours: false,
    },
    {
      student_name: "Sophia Wilson",
      student_id: 1005,
      grade: 9,
      honours: false,
      high_honours: false,
    },
  ];

  // Generic user data
  const userData = [
    { id: 1, name: "John Doe", email: "john@example.com", city: "New York" },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      city: "San Francisco",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert@example.com",
      city: "Chicago",
    },
  ];

  // Determine which data to use based on the prompt
  const dataToUse = prompt.toLowerCase().includes("student")
    ? studentData
    : userData;

  // Format the data based on the requested format
  switch (format.toLowerCase()) {
    case "json":
      return JSON.stringify(dataToUse, null, 2);

    case "csv":
      // Create CSV header based on the first object's keys
      const headers = Object.keys(dataToUse[0]).join(",");
      // Create CSV rows
      const rows = dataToUse.map((item) => Object.values(item).join(","));
      return [headers, ...rows].join("\n");

    case "sql":
      // Determine table name based on the data
      const tableName = prompt.toLowerCase().includes("student")
        ? "students"
        : "users";

      // Create SQL CREATE TABLE statement
      let sql = `CREATE TABLE ${tableName} (\n`;
      const firstItem = dataToUse[0];
      const columns = Object.entries(firstItem)
        .map(([key, value]) => {
          const type =
            typeof value === "number"
              ? "INTEGER"
              : typeof value === "boolean"
                ? "BOOLEAN"
                : "VARCHAR(255)";
          return `  ${key} ${type}`;
        })
        .join(",\n");
      sql += columns + "\n);\n\n";

      // Create SQL INSERT statements
      dataToUse.forEach((item) => {
        const values = Object.values(item)
          .map((val) => {
            if (typeof val === "string") return `'${val}'`;
            return val;
          })
          .join(", ");
        sql += `INSERT INTO ${tableName} VALUES (${values});\n`;
      });

      return sql;

    case "xml":
      // Determine root element name based on the data
      const rootName = prompt.toLowerCase().includes("student")
        ? "students"
        : "users";
      const itemName = prompt.toLowerCase().includes("student")
        ? "student"
        : "user";

      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>\n`;

      dataToUse.forEach((item) => {
        xml += `  <${itemName}>\n`;
        Object.entries(item).forEach(([key, value]) => {
          xml += `    <${key}>${value}</${key}>\n`;
        });
        xml += `  </${itemName}>\n`;
      });

      xml += `</${rootName}>`;
      return xml;

    case "yaml":
      let yaml = "";
      dataToUse.forEach((item, index) => {
        yaml += `- # item ${index + 1}\n`;
        Object.entries(item).forEach(([key, value]) => {
          yaml += `  ${key}: ${value}\n`;
        });
      });
      return yaml;

    default:
      // For any other format, return a simple text representation
      if (
        prompt.toLowerCase().includes("review") ||
        prompt.toLowerCase().includes("comment")
      ) {
        return '1. ★★★★★ "Amazing product! Exceeded my expectations in every way."\n\n2. ★★★★☆ "Very good quality, but shipping took longer than expected."\n\n3. ★★★☆☆ "Decent product for the price, but there\'s room for improvement."';
      } else {
        return "Sample synthetic data based on your request:\n\n- Item 1: Example data point with relevant attributes\n- Item 2: Another example with different characteristics\n- Item 3: A third variation showing the range of possibilities\n\nNote: This is placeholder data. In production, this would be generated by an AI model based on your specific request.";
      }
  }
}
