/*
    AUTHOR : SIDDHANT MANZE
    DATE   : 28/08/2021
*/
#include<bits/stdc++.h>
#define ll long long
using namespace std;

int main()
{
    int t;
    cin>>t;
    while (t--)
    {
        ll n,a,num=1;
        cin>>n>>a;
        for (num==1; num<350; num++)
        {
            if (num*num<=n && (num+1)*(num+1)>n)
            {
                break;
            }
        }
        cout<<num*a<<endl;
    }
    return 0;
}
