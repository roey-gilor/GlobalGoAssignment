using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSharpPart
{
    static class DataRepository
    {
        public static DataRow GetUserById(int userId)
        {
            return null; //I didn't wrote the method body because its not important to the answer
        }
    }
    class Program
    {
        #region Question 1 Part 1
        //FISRT PART OF QUESTION 1
        // The problem in IncludeInFinalResults method is the access to the enum member
        // The problem is that in switch-case statement the programmer tries to access this member like it was a refrence type
        // but in fact, the enum member is a value type.
        // In order to resolve the issue, I would refactor the code in the following way:

        //switch (enforcedOption)
        //        {
        //            case RoomAvailableOption.All: return true;
        //            case RoomAvailableOption.AvailableOnly: return isAvailable;
        //            case RoomAvailableOption.NotAvailableOnly: return !isAvailable;
        //            default: return true;
        //        }

        //Another issue is that in the method signature you need to define "Room" class (or change it to "RoomSearchFilter")
        //and define "CheckIfRoomAvailable" method
        #endregion

        #region Question 1 Part 2
        public string GetColunmData(object item)
        {
            return (item != DBNull.Value && item != null) ? item.ToString() : "";
        }
        public User GetUserFromDB(int userId)
        {
            DataRow dr = DataRepository.GetUserById(userId);
            User user = new User {
                UserId = userId,
                FirstName = GetColunmData(dr["FirstName"]),
                LastName = GetColunmData(dr["LastName"]),
                Address = GetColunmData(dr["Address"]),
                CityName = GetColunmData(dr["CityName"]),
                CountryName = GetColunmData(dr["CountryName"]),
                Email = GetColunmData(dr["Email"])
            };
            return user;
        }
        #endregion
        static void Main(string[] args)
        {
        }
    }
}
