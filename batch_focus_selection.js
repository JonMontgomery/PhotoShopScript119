// Main Code [Execution of script begins here]

// uncomment to suppress Illustrator warning dialogs
// app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;

//save function to save masks created
function saveJPEG( doc, saveFile, qty ) {  
     var saveOptions = new JPEGSaveOptions( );  
     saveOptions.embedColorProfile = true;  
     saveOptions.formatOptions = FormatOptions.STANDARDBASELINE;  
     saveOptions.matte = MatteType.NONE;  
     saveOptions.quality = qty;   
     doc.saveAs( saveFile, saveOptions, true );  
}  

//main code
var destFolder, sourceFolder, files, fileType, sourceDoc, targetFile, pdfSaveOpts;

// Select the source folder.
sourceFolder = Folder.selectDialog( 'Select a folder of photos');

// If a valid folder is selected
if ( sourceFolder != null )
{
    files = new Array();
    fileType = "*.jpg"; //prompt( 'Select type of Illustrator files to you want to process. Eg: *.ai', ' ' );

    // Get all files matching the pattern
    files = sourceFolder.getFiles( fileType );

    if ( files.length > 0 )
    {
        // Get the destination to save the files
		//uncomment the line below if you want the new photos saved in a different folder than the source folder
        //destFolder = Folder.selectDialog( 'Select the folder where you want to save the converted PDF files.', '~' );
        destFolder = sourceFolder;
        for ( i = 0; i < files.length; i++ )
        {	
            sourceDoc = app.open(files[i]); // returns the document object

			//opens action that will allow user to select level of focus and then creates mask
			app.doAction("Focus Tool Selection", "Mac Masking with Focus Selection");
			
			//save files
			var doc = app.activeDocument;
			var docName = doc.name;
			docName = docName.match(/(.*)(\.[^\.]+)/) ? docName = docName.match(/(.*)(\.[^\.]+)/):docName = [docName, docName];
			var suffix = '_mask';
			var saveName = new File(destFolder+'/'+docName[1]+suffix+'.jpg');
			saveJPEG(app.activeDocument, saveName, 10);
			sourceDoc.close(SaveOptions.DONOTSAVECHANGES);

		}
    }
    else
    {
        alert( 'No matching files found' );
    }
}