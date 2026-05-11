const fs = require('fs');
const pdfParse = require('pdf-parse');
const Groq = require('groq-sdk');

// PLAN B: Rule-Based Dictionary (Jab AI fail ho)
const roleSkills = {
    "MERN Stack Developer": ["react", "node.js", "node", "express", "mongodb", "javascript", "tailwind", "redux", "api", "git", "rest", "frontend", "backend", "full stack", "mongoose"],
    "Java Developer": ["java", "spring boot", "spring", "hibernate", "sql", "mysql", "oop", "maven", "rest", "j2ee", "microservices", "api", "postgresql", "junit"],
    "Frontend Developer": ["html", "css", "javascript", "react", "vue", "angular", "bootstrap", "tailwind", "ui/ux", "responsive design", "figma", "web development", "typescript"],
    "Data Scientist / Analyst": ["python", "machine learning", "sql", "data analysis", "pandas", "numpy", "matplotlib", "scikit-learn", "statistics", "tableau", "power bi", "excel", "deep learning"],
    "Software Development Engineer (SDE)": ["c++", "c", "java", "python", "data structures", "algorithms", "dsa", "oop", "dbms", "operating systems", "computer networks", "system design", "git", "linux"],
    "DevOps Engineer": ["aws", "docker", "kubernetes", "ci/cd", "jenkins", "linux", "bash", "shell scripting", "git", "azure", "terraform", "ansible"],
    "Android/App Developer": ["java", "kotlin", "android studio", "flutter", "dart", "react native", "mobile app development", "firebase", "api integration", "ui design"],
    "Cyber Security Analyst": ["networking", "linux", "ethical hacking", "cryptography", "wireshark", "penetration testing", "kali linux", "security", "firewall", "owasp"]
};

const analyzeResume = async (req, res) => {
    // Dotenv load hone ke baad Groq initialize hoga (To avoid timing issue)
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    
    let filePath = "";
    try {
        const role = req.body.role;
        const file = req.file;

        if (!file || !role) {
            return res.status(400).json({ error: "Please provide both resume and role." });
        }

        filePath = file.path;
        const dataBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(dataBuffer);
        const resumeText = pdfData.text;

        // --- PLAN A: Groq AI (Llama 3) ---
        try {
            console.log("Trying Groq AI Analysis...");
            
            // Naya prompt jisme strengthsSummary aur improvementsSummary add kiya gaya hai
            const prompt = `
            You are an expert ATS (Applicant Tracking System) and Senior HR Manager.
            Analyze this resume for the target role of: ${role}.
            Provide the output in strictly valid JSON format only, exactly like this:
            {
                "score": <number between 0 and 100 representing ATS match>,
                "message": "<short 1-line professional feedback message>",
                "strengthsSummary": "<A short paragraph (2-3 sentences) explaining the candidate's strong points, what they did well, and why they fit the role based on the resume.>",
                "improvementsSummary": "<A short paragraph (2-3 sentences) explaining their weaknesses, missing technologies, and actionable advice to improve ATS compatibility.>",
                "matchedSkills": ["skill1", "skill2"],
                "missingSkills": ["skill1", "skill2"]
            }
            Resume Text: ${resumeText}`;

            const chatCompletion = await groq.chat.completions.create({
                messages: [{ role: "user", content: prompt }],
                model: "llama-3.1-8b-instant", // Superfast model
                response_format: { type: "json_object" }, 
            });

            const responseText = chatCompletion.choices[0]?.message?.content;
            const groqData = JSON.parse(responseText);

            // Successfully analyzed, delete temporary file
            fs.unlinkSync(filePath); 
            
            return res.json({
                ...groqData,
                role,
                method: "AI Powered (Groq Llama-3)" 
            });

        } catch (aiError) {
            // --- PLAN B: Rule-Based Fallback ---
            console.log("Groq AI Failed. Switching to Offline Rule-Based Fallback...", aiError.message);
            
            const requiredSkills = roleSkills[role] || [];
            const resumeTextLower = resumeText.toLowerCase();
            
            let matched = [];
            requiredSkills.forEach(skill => {
                if (resumeTextLower.includes(skill.toLowerCase())) matched.push(skill);
            });

            const missing = requiredSkills.filter(s => !matched.includes(s));
            const calculatedScore = requiredSkills.length > 0 
                ? Math.round((matched.length / requiredSkills.length) * 100) : 0;

            fs.unlinkSync(filePath);
            
            return res.json({
                role,
                score: calculatedScore,
                matchedSkills: matched,
                missingSkills: missing,
                message: "Analysis complete using offline keyword matching.",
                strengthsSummary: "Your resume shows a solid foundation in core technologies. (Note: AI generation is currently offline, this is a rule-based scan).",
                improvementsSummary: "Consider adding the missing skills listed below to improve your ATS compatibility for this specific role.",
                method: "Rule-Based (Fallback)"
            });
        }

    } catch (globalError) {
        console.error("Critical Error:", globalError);
        // Error aaye toh bhi storage full na ho isliye file delete kar do
        if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
        res.status(500).json({ error: "Something went wrong during analysis. Please try again." });
    }
};

module.exports = { analyzeResume };