import  {Database}  from "sqlite3";
import { open } from 'sqlite';
import { createCompany, deleteCompanyByID, getAllCompanies, getCompanyByID, getVideogameByID } from './CRUD';

//This is usefull to open the database
(async () => {
    try{
        const db = await open({ //Open the database
            filename: 'Sources/videogamesDB/videogames.db',
            driver: Database,
        });
        console.log('Succesfull conexion from the database');

        const tables = await db.all(
            `SELECT name FROM sqlite_master WHERE type='table';` //SQL Strings Commands
        );
        console.log('tables found it', tables);
        await db.close(); //Close the datababse
    }catch(error){
        console.error('Issues found when try to connect the database', error)
    }
})();
//This is usefull open data from different tables 
(async () => {
    try{
        const db = await open({
            filename: 'Sources/videogamesDB/videogames.db',
            driver: Database,
        });
        console.log('Database Conection Succesfull');

        const users = await db.all('SELECT * FROM Users');
        console.log('Data from Users:', users);

        await db.close();
    }catch(error){
        console.error('ISsues found it on the database', error);
    }
})();

//Test CRUD

async function testCRUD() {
    try{
        const companyCreate = await createCompany({ company_name: 'Naughty Dogs' });
        console.log('Created Company ID:', companyCreate);
        
        // READ: All companies
        const companies = await getAllCompanies();
        console.log('All Companies:', companies);
    
        // READ BY ID: One company
        const company = await getCompanyByID(2);
        console.log('Company by ID:', company);
    
        // DELETE: Delete a company
        await deleteCompanyByID(2);
        console.log(`Company with ID ${companyCreate} deleted.`);
    
        // Check the companies after the delete
        const companiesAfterDeletion = await getAllCompanies();
        console.log('Companies after deletion:', companiesAfterDeletion);
    
        
        console.log('--- Tests Completed Successfully ---');
      } catch (error) {
        console.error('Error during tests:', error.message);
      }
}

testCRUD();