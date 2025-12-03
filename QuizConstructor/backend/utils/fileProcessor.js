import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import JSZip from 'jszip';

// Set PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * Extract text from PDF buffer
 */
export const extractPdfText = async (buffer) => {
  try {
    console.log('📄 Extracting text from PDF...');
    const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
    let text = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      text += pageText + '\n';
    }
    
    console.log(`✅ Extracted ${text.length} characters from PDF (${pdf.numPages} pages)`);
    return text;
  } catch (error) {
    throw new Error(`Failed to extract text from PDF: ${error.message}`);
  }
};

/**
 * Extract text from DOCX buffer
 */
export const extractDocxText = async (buffer) => {
  try {
    console.log('📝 Extracting text from DOCX...');
    const result = await mammoth.extractRawText({ buffer });
    console.log(`✅ Extracted ${result.value.length} characters from DOCX`);
    return result.value;
  } catch (error) {
    throw new Error(`Failed to extract text from DOCX: ${error.message}`);
  }
};

/**
 * Extract text from TXT buffer
 */
export const extractTxtText = (buffer) => {
  try {
    console.log('📋 Extracting text from TXT...');
    const text = buffer.toString('utf-8');
    console.log(`✅ Extracted ${text.length} characters from TXT`);
    return text;
  } catch (error) {
    throw new Error(`Failed to extract text from TXT: ${error.message}`);
  }
};

/**
 * Extract text from PPTX buffer
 * Extracts text from all slides
 */
export const extractPptxText = async (buffer) => {
  try {
    console.log('🎯 Extracting text from PPTX...');
    const zip = new JSZip();
    await zip.loadAsync(buffer);
    
    let text = '';
    const slideFiles = Object.keys(zip.files)
      .filter(name => name.match(/ppt\/slides\/slide\d+\.xml$/))
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)[0]);
        const numB = parseInt(b.match(/\d+/)[0]);
        return numA - numB;
      });
    
    for (const slideFile of slideFiles) {
      const content = await zip.files[slideFile].async('string');
      const textMatches = content.match(/<a:t>([^<]*)<\/a:t>/g) || [];
      if (textMatches.length > 0) {
        textMatches.forEach(match => {
          const textContent = match.replace(/<a:t>|<\/a:t>/g, '');
          if (textContent.trim()) {
            text += textContent + ' ';
          }
        });
        text += '\n';
      }
    }
    
    console.log(`✅ Extracted ${text.length} characters from PPTX (${slideFiles.length} slides)`);
    return text;
  } catch (error) {
    throw new Error(`Failed to extract text from PPTX: ${error.message}`);
  }
};

/**
 * Extract text from file based on file type
 */
export const extractFileText = async (buffer, filename) => {
  const extension = filename.toLowerCase().split('.').pop();
  
  switch (extension) {
    case 'pdf':
      return await extractPdfText(buffer);
    case 'docx':
    case 'doc':
      return await extractDocxText(buffer);
    case 'txt':
      return await extractTxtText(buffer);
    case 'pptx':
    case 'ppt':
      return await extractPptxText(buffer);
    default:
      throw new Error(`Unsupported file format: .${extension}`);
  }
};

/**
 * Validate file size (max 10MB)
 */
export const validateFileSize = (buffer, maxSizeMB = 10) => {
  const maxBytes = maxSizeMB * 1024 * 1024;
  if (buffer.length > maxBytes) {
    throw new Error(`File size exceeds maximum of ${maxSizeMB}MB`);
  }
  return true;
};

/**
 * Validate file type
 */
export const validateFileType = (filename) => {
  const allowedExtensions = ['pdf', 'docx', 'doc', 'txt', 'pptx', 'ppt'];
  const extension = filename.toLowerCase().split('.').pop();
  
  if (!allowedExtensions.includes(extension)) {
    throw new Error(`Unsupported file format. Allowed: ${allowedExtensions.join(', ')}`);
  }
  return true;
};
